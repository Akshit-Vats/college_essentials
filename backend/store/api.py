from typing import List
from ninja import Router, Schema
from django.shortcuts import get_object_or_404
from django.db.models import Count
from .models import Product, Category

router = Router()

class CategorySchema(Schema):
    id: int
    name: str
    slug: str
    image_url: str | None = None
    products_count: int = 0

class ProductSchema(Schema):
    id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str | None = None
    category: CategorySchema
    is_active: bool

@router.get("/categories", response=List[CategorySchema])
def list_categories(request):
    return Category.objects.annotate(products_count=Count('products')).all()

@router.get("/products", response=List[ProductSchema])
def list_products(request):
    return Product.objects.filter(is_active=True).select_related('category')

@router.get("/products/{product_id}", response=ProductSchema)
def get_product(request, product_id: int):
    return get_object_or_404(Product.objects.select_related('category'), id=product_id)

# --- Order Schemas ---

class OrderItemSchema(Schema):
    product_id: int
    quantity: int

class CreateOrderSchema(Schema):
    items: List[OrderItemSchema]
    shipping_address: str

from datetime import datetime

class OrderSchema(Schema):
    id: int
    total_amount: float
    status: str
    shipping_address: str
    created_at: datetime
    # We could include items here too if needed

# --- Admin Schemas ---

class CreateProductSchema(Schema):
    name: str
    description: str = ""
    price: float
    stock: int
    category_id: int
    image_url: str | None = None

class UpdateProductSchema(Schema):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    stock: int | None = None
    category_id: int | None = None
    image_url: str | None = None
    is_active: bool | None = None

class CreateCategorySchema(Schema):
    name: str
    slug: str
    image_url: str | None = None

# --- Public Order Endpoints ---

@router.post("/orders", response=OrderSchema)
def create_order(request, payload: CreateOrderSchema):
    if not request.user.is_authenticated:
        from ninja.errors import HttpError
        raise HttpError(401, "Not authenticated")
    
    from .models import Order, OrderItem
    
    # Calculate total and verify stock
    total_amount = 0
    order_items_data = []
    
    for item in payload.items:
        product = get_object_or_404(Product, id=item.product_id)
        if product.stock < item.quantity:
            from ninja.errors import HttpError
            raise HttpError(400, f"Not enough stock for {product.name}")
        
        total_amount += float(product.price) * item.quantity
        order_items_data.append({
            "product": product,
            "quantity": item.quantity,
            "price": product.price
        })

    # Create Order
    order = Order.objects.create(
        user=request.user,
        total_amount=total_amount,
        shipping_address=payload.shipping_address,
        status='PENDING'
    )

    # Create Items and Update Stock
    for item_data in order_items_data:
        OrderItem.objects.create(
            order=order,
            product=item_data["product"],
            quantity=item_data["quantity"],
            price=item_data["price"]
        )
        item_data["product"].stock -= item_data["quantity"]
        item_data["product"].save()

    return order

# --- Admin Endpoints ---

@router.get("/admin/orders", response=List[OrderSchema])
def list_orders_admin(request):
    if not request.user.is_staff:
        from ninja.errors import HttpError
        raise HttpError(403, "Admin access required")
    from .models import Order
    return Order.objects.all().order_by('-created_at')

@router.post("/admin/products", response=ProductSchema)
def create_product_admin(request, payload: CreateProductSchema):
    if not request.user.is_staff:
        from ninja.errors import HttpError
        raise HttpError(403, "Admin access required")
    
    category = get_object_or_404(Category, id=payload.category_id)
    product = Product.objects.create(
        category=category,
        **payload.dict(exclude={'category_id'})
    )
    return product

@router.put("/admin/products/{product_id}", response=ProductSchema)
def update_product_admin(request, product_id: int, payload: UpdateProductSchema):
    if not request.user.is_staff:
        from ninja.errors import HttpError
        raise HttpError(403, "Admin access required")
    
    product = get_object_or_404(Product, id=product_id)
    for attr, value in payload.dict(exclude_unset=True).items():
        if attr == 'category_id':
            product.category = get_object_or_404(Category, id=value)
        else:
            setattr(product, attr, value)
    product.save()
    return product

@router.delete("/admin/products/{product_id}")
def delete_product_admin(request, product_id: int):
    if not request.user.is_staff:
        from ninja.errors import HttpError
        raise HttpError(403, "Admin access required")
    
    product = get_object_or_404(Product, id=product_id)
    product.delete()
    return {"success": True}

@router.post("/admin/categories", response=CategorySchema)
def create_category_admin(request, payload: CreateCategorySchema):
    if not request.user.is_staff:
        from ninja.errors import HttpError
        raise HttpError(403, "Admin access required")
    
    category = Category.objects.create(**payload.dict())
    return category

@router.delete("/admin/categories/{category_id}")
def delete_category_admin(request, category_id: int):
    if not request.user.is_staff:
        from ninja.errors import HttpError
        raise HttpError(403, "Admin access required")
    
    category = get_object_or_404(Category, id=category_id)
    category.delete()
    return {"success": True}

# --- Supplier Endpoints ---

class UpdateStockSchema(Schema):
    stock: int

@router.get("/supplier/products", response=List[ProductSchema])
def list_supplier_products(request):
    if not request.user.is_authenticated or not hasattr(request.user, 'supplier_profile'):
        from ninja.errors import HttpError
        raise HttpError(403, "Supplier access required")
    
    category = request.user.supplier_profile.category
    return Product.objects.filter(category=category)

@router.patch("/supplier/products/{product_id}/stock", response=ProductSchema)
def update_supplier_stock(request, product_id: int, payload: UpdateStockSchema):
    if not request.user.is_authenticated or not hasattr(request.user, 'supplier_profile'):
        from ninja.errors import HttpError
        raise HttpError(403, "Supplier access required")
    
    category = request.user.supplier_profile.category
    product = get_object_or_404(Product, id=product_id, category=category)
    
    product.stock = payload.stock
    product.save()
    return product

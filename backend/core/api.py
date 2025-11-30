from ninja import Router, Schema
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from pydantic import Field

router = Router()

class UserSchema(Schema):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    is_staff: bool
    is_supplier: bool = False

class LoginSchema(Schema):
    username: str
    password: str

class SignupSchema(Schema):
    username: str
    email: str
    password: str
    first_name: str = ""
    last_name: str = ""

@router.post("/signup", response=UserSchema)
def signup(request: HttpRequest, payload: SignupSchema):
    if User.objects.filter(username=payload.username).exists():
        from ninja.errors import HttpError
        raise HttpError(400, "Username already exists")
    
    try:
        user = User.objects.create_user(
            username=payload.username,
            email=payload.email,
            password=payload.password,
            first_name=payload.first_name,
            last_name=payload.last_name
        )
    except Exception as e:
        from ninja.errors import HttpError
        raise HttpError(500, f"Error creating user: {str(e)}")

    user = authenticate(request, username=payload.username, password=payload.password)
    
    if user is None:
        # This should theoretically not happen right after creation, but good to handle
        from ninja.errors import HttpError
        raise HttpError(500, "User created but authentication failed")

    login(request, user)
    
    # Check for supplier profile
    user.is_supplier = hasattr(user, 'supplier_profile')
    return user

@router.post("/login", response=UserSchema)
def login_user(request: HttpRequest, payload: LoginSchema):
    user = authenticate(request, username=payload.username, password=payload.password)
    if user is not None:
        login(request, user)
        user.is_supplier = hasattr(user, 'supplier_profile')
        return user
    else:
        from ninja.errors import HttpError
        raise HttpError(401, "Invalid credentials")

@router.post("/logout")
def logout_user(request: HttpRequest):
    logout(request)
    return {"success": True}

@router.get("/me", response=UserSchema)
def me(request: HttpRequest):
    if not request.user.is_authenticated:
        from ninja.errors import HttpError
        raise HttpError(401, "Not authenticated")
    
    request.user.is_supplier = hasattr(request.user, 'supplier_profile')
    return request.user

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import api from '@/lib/api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        image_url: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/store/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/store/admin/categories', formData);
            setIsModalOpen(false);
            setFormData({ name: '', slug: '', image_url: '' });
            fetchData();
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category? All products in this category will also be deleted.')) {
            try {
                await api.delete(`/store/admin/categories/${id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name)
        });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                {category.image_url ? (
                                    <img src={category.image_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                                        {category.name[0]}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{category.name}</h3>
                                <p className="text-sm text-slate-500">{category.products_count} products</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(category.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Add New Category</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-lg border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-500"
                                    value={formData.slug}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full rounded-lg border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.image_url}
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;

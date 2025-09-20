import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Cart, { CartItem } from '@/components/ui/cart';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  sizes: string[];
  sale?: boolean;
  originalPrice?: number;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Designer Jacket",
      description: "Стильная дизайнерская куртка",
      image: "/img/d0c02aa8-4880-4c77-b25a-2f44340c6dd8.jpg",
      price: 12990,
      category: "Верхняя одежда",
      brand: "LUXURY",
      sizes: ["S", "M", "L", "XL"],
      sale: true,
      originalPrice: 15990
    },
    {
      id: 2,
      name: "Trendy T-Shirt",
      description: "Модная футболка с принтом",
      image: "/img/30221c11-1f7a-410e-bb31-b70a6d458085.jpg",
      price: 3490,
      category: "Футболки",
      brand: "STREET",
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Premium Jeans",
      description: "Премиальные джинсы",
      image: "/img/222c48b3-97b1-4d48-a3a6-abc041eb1c8c.jpg",
      price: 8990,
      category: "Джинсы",
      brand: "DENIM",
      sizes: ["28", "30", "32", "34", "36"]
    },
    {
      id: 4,
      name: "Urban Hoodie",
      description: "Городское худи",
      image: "/img/252a6457-706f-460e-bf89-97b9dcf9079d.jpg",
      price: 5990,
      category: "Худи",
      brand: "URBAN",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 5,
      name: "Designer Sneakers",
      description: "Дизайнерские кроссовки",
      image: "/img/f8964e21-a844-4554-bac2-3b380ba643ab.jpg",
      price: 14990,
      category: "Обувь",
      brand: "KICKS",
      sizes: ["39", "40", "41", "42", "43", "44"]
    }
  ];

  const categories = ["Все", "Верхняя одежда", "Футболки", "Джинсы", "Худи", "Обувь"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product, size: string = 'M') => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        size
      }]);
    }
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              FASHION STORE
            </h1>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Бренды</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Распродажа</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Icon name="Heart" size={20} className="cursor-pointer hover:text-primary transition-colors" />
            <Cart 
              items={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
            />
            <Icon name="User" size={20} className="cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-purple-600/10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Новая коллекция 2024
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Брендовая
            <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Одежда
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Эксклюзивные коллекции от ведущих мировых брендов. Стиль, качество и комфорт в каждой детали.
          </p>
          <div className="relative max-w-md mx-auto mb-8">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
          <Button size="lg" className="rounded-full px-8">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Товары ({filteredProducts.length})</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Сортировать:</span>
              <Button variant="outline" size="sm">
                По популярности
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.sale && (
                      <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600">
                        SALE
                      </Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <Button
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => addToCart(product)}
                    >
                      Добавить в корзину
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {product.brand}
                        </Badge>
                        <h4 className="font-semibold text-sm">{product.name}</h4>
                      </div>
                      <Icon name="Heart" size={18} className="cursor-pointer hover:text-red-500 transition-colors" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">₽{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₽{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          {product.sizes.slice(0, 3).map((size) => (
                            <Badge key={size} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                          {product.sizes.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.sizes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Icon name="Mail" size={48} className="mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Подпишись на новости</h3>
          <p className="text-lg mb-8 opacity-90">
            Получай первым информацию о новых коллекциях и эксклюзивных скидках
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Ваш email"
              className="rounded-r-none bg-white text-black border-white"
            />
            <Button variant="secondary" className="rounded-l-none">
              Подписаться
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FASHION STORE
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Ваш стиль — наша страсть. Лучшие бренды мира в одном месте.
              </p>
              <div className="flex space-x-4">
                <Icon name="Instagram" size={20} className="cursor-pointer hover:text-primary transition-colors" />
                <Icon name="MessageCircle" size={20} className="cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Mail" size={20} className="cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Каталог</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Новинки</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Мужская одежда</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Женская одежда</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Обувь</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Возврат товара</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Таблица размеров</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Контакты</h5>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@fashionstore.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Тверская, 1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 FASHION STORE. Все права защищены.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
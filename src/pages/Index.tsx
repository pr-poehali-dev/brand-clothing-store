import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const brands = [
    {
      id: 1,
      name: "Urban Style",
      description: "Современная уличная мода",
      image: "/img/4fba2d65-8652-446b-b6d6-a11dba8ee3be.jpg",
      price: "₽4,990",
      category: "Джинсовая куртка"
    },
    {
      id: 2,
      name: "Street Vibes",
      description: "Яркие худи и свитшоты",
      image: "/img/252a6457-706f-460e-bf89-97b9dcf9079d.jpg",
      price: "₽3,490",
      category: "Худи"
    },
    {
      id: 3,
      name: "Fresh Kicks",
      description: "Дизайнерские кроссовки",
      image: "/img/f8964e21-a844-4554-bac2-3b380ba643ab.jpg",
      price: "₽8,990",
      category: "Кроссовки"
    }
  ];

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold tracking-tight">BRANDED CLOTHING</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Новинки</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Распродажа</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Icon name="Heart" size={20} className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="ShoppingBag" size={20} className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="User" size={20} className="cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Молодёжные бренды
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Яркие коллекции и трендовые новинки для современной молодёжи
          </p>
          <div className="relative max-w-md mx-auto animate-scale-in">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => (
              <Card key={brand.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{brand.category}</h3>
                      <Icon name="Heart" size={18} className="cursor-pointer hover:text-red-500 transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{brand.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">{brand.price}</span>
                      <Button className="rounded-full px-6">
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Подпишись на новинки</h3>
          <p className="text-lg mb-8 opacity-90">Будь первым в курсе трендов</p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Твой email"
              className="rounded-r-none bg-primary-foreground text-primary border-primary-foreground"
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
              <h4 className="font-bold mb-4">BRANDED CLOTHING</h4>
              <p className="text-sm text-muted-foreground">
                Лучшие молодёжные бренды в одном месте
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-4">Каталог</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Новинки</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Одежда</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Обувь</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Доставка</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Возврат</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Размеры</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Контакты</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (999) 123-45-67</p>
                <p>info@brandedclothing.ru</p>
                <div className="flex space-x-4 mt-4">
                  <Icon name="Instagram" size={20} className="cursor-pointer hover:text-foreground" />
                  <Icon name="MessageCircle" size={20} className="cursor-pointer hover:text-foreground" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 BRANDED CLOTHING. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
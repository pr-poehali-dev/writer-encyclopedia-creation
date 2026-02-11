import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const writers = [
  {
    id: 1,
    name: 'Александр Пушкин',
    years: '1799-1837',
    description: 'Величайший русский поэт, прозаик и драматург. Основоположник современного русского литературного языка.',
    works: ['Евгений Онегин', 'Капитанская дочка', 'Борис Годунов', 'Медный всадник'],
    genre: 'Поэзия',
    quote: 'Быть можно дельным человеком и думать о красе ногтей'
  },
  {
    id: 2,
    name: 'Федор Достоевский',
    years: '1821-1881',
    description: 'Один из величайших романистов мира. Мастер психологического романа.',
    works: ['Преступление и наказание', 'Братья Карамазовы', 'Идиот', 'Бесы'],
    genre: 'Роман',
    quote: 'Красота спасет мир'
  },
  {
    id: 3,
    name: 'Лев Толстой',
    years: '1828-1910',
    description: 'Величайший русский писатель и мыслитель. Автор монументальных эпических романов.',
    works: ['Война и мир', 'Анна Каренина', 'Воскресение', 'Смерть Ивана Ильича'],
    genre: 'Роман',
    quote: 'Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему'
  },
  {
    id: 4,
    name: 'Антон Чехов',
    years: '1860-1904',
    description: 'Классик мировой литературы, мастер короткого рассказа и драматург.',
    works: ['Вишневый сад', 'Чайка', 'Три сестры', 'Дама с собачкой'],
    genre: 'Драматургия',
    quote: 'Краткость — сестра таланта'
  },
  {
    id: 5,
    name: 'Михаил Булгаков',
    years: '1891-1940',
    description: 'Выдающийся русский писатель и драматург. Мастер сатиры и мистики.',
    works: ['Мастер и Маргарита', 'Белая гвардия', 'Собачье сердце', 'Роковые яйца'],
    genre: 'Проза',
    quote: 'Рукописи не горят'
  },
  {
    id: 6,
    name: 'Анна Ахматова',
    years: '1889-1966',
    description: 'Великая русская поэтесса, одна из крупнейших фигур русской литературы XX века.',
    works: ['Реквием', 'Поэма без героя', 'Вечер', 'Белая стая'],
    genre: 'Поэзия',
    quote: 'Я научила женщин говорить'
  }
];

const genres = ['Все', 'Поэзия', 'Роман', 'Драматургия', 'Проза'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedWriter, setSelectedWriter] = useState<typeof writers[0] | null>(null);

  const filteredWriters = writers.filter(writer => {
    const matchesSearch = writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.works.some(work => work.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = selectedGenre === 'Все' || writer.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="BookOpen" size={36} className="text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-primary">Литературная библиотека</h1>
                <p className="text-sm text-muted-foreground">Великие писатели России и СССР</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-card to-background border-b border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">
            Откройте мир русской литературы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Биографии, произведения и цитаты величайших писателей, изменивших мировую культуру
          </p>
          <div className="flex items-center gap-2 max-w-xl mx-auto">
            <Icon name="Search" className="text-muted-foreground absolute ml-3" size={20} />
            <Input
              placeholder="Поиск по именам и произведениям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredWriters.map((writer) => (
            <Card
              key={writer.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border-2"
              onClick={() => setSelectedWriter(writer)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-1">{writer.name}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-muted-foreground">
                      {writer.years}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {writer.genre}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {writer.description}
                </p>
                <div className="border-l-4 border-accent pl-3 mb-4 italic text-sm text-foreground">
                  «{writer.quote}»
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Основные произведения:</p>
                  <div className="flex flex-wrap gap-1">
                    {writer.works.slice(0, 3).map((work, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {work}
                      </Badge>
                    ))}
                    {writer.works.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{writer.works.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWriters.length === 0 && (
          <div className="text-center py-16">
            <Icon name="BookX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              Ничего не найдено. Попробуйте изменить поисковый запрос.
            </p>
          </div>
        )}
      </section>

      {selectedWriter && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedWriter(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{selectedWriter.name}</CardTitle>
                  <CardDescription className="text-lg">{selectedWriter.years}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedWriter(null)}
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-4">
                {selectedWriter.genre}
              </Badge>
              <p className="text-lg leading-relaxed mb-6">{selectedWriter.description}</p>
              
              <div className="border-l-4 border-accent pl-4 mb-6 italic bg-muted/30 py-3 rounded-r">
                <p className="text-foreground">«{selectedWriter.quote}»</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Icon name="Book" size={20} />
                  Произведения
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedWriter.works.map((work, idx) => (
                    <div
                      key={idx}
                      className="border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors"
                    >
                      <p className="font-medium">{work}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;

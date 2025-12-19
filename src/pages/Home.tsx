import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Grid3x3, Calendar, Library, Store } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'Activity Builder',
      description: 'Create custom matching, sorting, and choice activities with drag-and-drop interface',
      icon: Sparkles,
      path: '/activity-builder',
      color: 'bg-primary'
    },
    {
      title: 'AAC Board Builder',
      description: 'Design communication boards with symbols, text, and audio for AAC therapy',
      icon: Grid3x3,
      path: '/aac-builder',
      color: 'bg-secondary'
    },
    {
      title: 'Visual Schedule Creator',
      description: 'Build step-by-step routines and schedules for daily activities',
      icon: Calendar,
      path: '/schedule-builder',
      color: 'bg-accent'
    },
    {
      title: 'Resource Marketplace',
      description: 'Discover, share, and download therapy resources created by the community',
      icon: Store,
      path: '/marketplace',
      color: 'bg-primary'
    },
    {
      title: 'My Library',
      description: 'View and manage all your created activities, boards, and schedules',
      icon: Library,
      path: '/library',
      color: 'bg-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 xl:py-12">
        <div className="max-w-4xl mx-auto text-center mb-8 xl:mb-12">
          <h1 className="text-3xl xl:text-5xl font-bold mb-4 text-foreground">
            Uppoo
          </h1>
          <p className="text-base xl:text-lg text-muted-foreground max-w-2xl mx-auto">
            Create culturally relevant therapeutic activities for children with ADHD and Autism. 
            Build AAC boards, visual schedules, and interactive activities with Indian context and multilingual support.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.path} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${tool.color} p-3 rounded-xl text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link to={tool.path}>
                    <Button className="w-full" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">✨ Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🇮🇳</div>
                  <div>
                    <h3 className="font-semibold mb-1">Indian Context</h3>
                    <p className="text-sm text-muted-foreground">
                      Pre-loaded symbols for Indian food, transport, festivals, and routines
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🗣️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Multilingual</h3>
                    <p className="text-sm text-muted-foreground">
                      Support for English, Hindi, and regional languages
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h3 className="font-semibold mb-1">Parent-Friendly</h3>
                    <p className="text-sm text-muted-foreground">
                      Share via WhatsApp with simple, low-bandwidth viewer
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

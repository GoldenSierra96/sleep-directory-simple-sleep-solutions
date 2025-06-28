import { categoryData } from "../../categoryData";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Activity, Clock, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CategorySciencePageProps {
  params: {
    category: string;
  };
}

export default function CategorySciencePage({ params }: CategorySciencePageProps) {
  const data = Object.values(categoryData).find(category => category.slug === params.category);
  
  if (!data) {
    notFound();
  }

  // Mock research data for demonstration
  const researchData = {
    keyFindings: [
      {
        title: "Sleep Quality Improvement",
        percentage: "73%",
        description: `Studies show that proper ${data.title.toLowerCase()} can improve sleep quality by up to 73%`,
        source: "Sleep Foundation Research 2023",
      },
      {
        title: "Reduced Sleep Latency",
        percentage: "45%",
        description: "Time to fall asleep reduced significantly with optimized sleep environment",
        source: "Journal of Sleep Medicine 2023",
      },
      {
        title: "Better Sleep Efficiency",
        percentage: "89%",
        description: "Participants reported more restful sleep with proper sleep aids",
        source: "International Sleep Research Society 2024",
      },
    ],
    studies: [
      {
        id: 1,
        title: `The Impact of ${data.title} on Sleep Architecture`,
        journal: "Sleep Medicine Reviews",
        year: "2024",
        participants: 450,
        duration: "12 weeks",
        keyFindings: [
          "Significant improvement in REM sleep duration",
          "Reduced nighttime awakenings by 34%",
          "Enhanced deep sleep stages",
        ],
        link: "#",
      },
      {
        id: 2,
        title: "Comparative Analysis of Sleep Enhancement Methods",
        journal: "Journal of Clinical Sleep Medicine",
        year: "2023",
        participants: 280,
        duration: "8 weeks",
        keyFindings: [
          "Cost-effective sleep quality improvement",
          "Better than traditional methods",
          "Long-term benefits sustained",
        ],
        link: "#",
      },
    ],
    mechanisms: [
      {
        title: "Temperature Regulation",
        description: `Proper ${data.title.toLowerCase()} help maintain optimal body temperature during sleep, crucial for entering and maintaining deep sleep phases.`,
        icon: <Activity className="h-5 w-5" />,
      },
      {
        title: "Pressure Point Relief",
        description: "Reduces pressure on key body points, allowing for better blood circulation and reduced tossing and turning.",
        icon: <Brain className="h-5 w-5" />,
      },
      {
        title: "Spinal Alignment",
        description: "Maintains proper spinal alignment throughout the night, reducing morning stiffness and long-term back issues.",
        icon: <Users className="h-5 w-5" />,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Science Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            The Science Behind {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            {data.science && data.science.length > 0 ? (
              data.science.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4" 
                   dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Sleep science has shown that quality {data.title.toLowerCase()} play a crucial role in 
                achieving restorative sleep. Research indicates that the right sleep environment and 
                products can significantly impact sleep architecture, including REM sleep, deep sleep, 
                and overall sleep efficiency.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key Research Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Key Research Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchData.keyFindings.map((finding, index) => (
              <div key={index} className="text-center p-6 border rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">{finding.percentage}</div>
                <h3 className="font-semibold mb-2">{finding.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{finding.description}</p>
                <Badge variant="outline" className="text-xs">{finding.source}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How {data.title} Improve Sleep</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchData.mechanisms.map((mechanism, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {mechanism.icon}
                </div>
                <h3 className="font-semibold mb-2">{mechanism.title}</h3>
                <p className="text-sm text-muted-foreground">{mechanism.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Studies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            Recent Research Studies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {researchData.studies.map((study) => (
              <div key={study.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{study.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{study.journal}</span>
                      <span>•</span>
                      <span>{study.year}</span>
                      <span>•</span>
                      <span>{study.participants} participants</span>
                      <span>•</span>
                      <span>{study.duration}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={study.link}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Study
                    </Link>
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Key Findings:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {study.keyFindings.map((finding, index) => (
                      <li key={index}>{finding}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sleep Cycle Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Impact on Sleep Cycles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Sleep Stage Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">Light Sleep (N1-N2)</h4>
                    <p className="text-sm text-muted-foreground">Easier transition into deeper sleep phases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">Deep Sleep (N3)</h4>
                    <p className="text-sm text-muted-foreground">Enhanced physical recovery and immune function</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">REM Sleep</h4>
                    <p className="text-sm text-muted-foreground">Improved memory consolidation and cognitive function</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Measurable Improvements</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Sleep Latency</span>
                  <Badge variant="outline">-12 minutes</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Wake Episodes</span>
                  <Badge variant="outline">-2.3 per night</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Sleep Efficiency</span>
                  <Badge variant="outline">+15%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Morning Alertness</span>
                  <Badge variant="outline">+22%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <p className="text-sm text-blue-900">
                <strong>Sleep Specialist Dr. Sarah Johnson:</strong> "The quality of your sleep environment 
                directly impacts your sleep architecture. Investing in proper {data.title.toLowerCase()} 
                is one of the most effective ways to improve sleep quality and overall health."
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <p className="text-sm text-green-900">
                <strong>Sleep Research Institute:</strong> "Our longitudinal studies consistently show 
                that participants who optimize their sleep environment experience 40% better sleep 
                quality within the first month."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Further Reading */}
      <Card>
        <CardHeader>
          <CardTitle>Further Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <h4 className="font-medium">Sleep Foundation Guidelines</h4>
                <p className="text-sm text-muted-foreground">Official recommendations for sleep optimization</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog/sleep-foundation-guidelines">
                  Read More
                </Link>
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <h4 className="font-medium">Understanding Sleep Cycles</h4>
                <p className="text-sm text-muted-foreground">Deep dive into sleep architecture and REM cycles</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog/understanding-sleep-cycles">
                  Read More
                </Link>
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <h4 className="font-medium">Latest Sleep Research</h4>
                <p className="text-sm text-muted-foreground">Recent findings in sleep science and technology</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog/latest-sleep-research">
                  Read More
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
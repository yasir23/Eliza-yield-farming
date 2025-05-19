import { BarChart2, Calendar, Globe, HeartHandshake, Leaf, LineChart, Users } from "lucide-react";
import PageTitle from "@/components/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for ESG impact
const impactData = {
  totalDonated: 85300,
  impactCategories: [
    { name: "Environmental", percentage: 40, amount: 34120, icon: Leaf },
    { name: "Social", percentage: 35, amount: 29855, icon: Users },
    { name: "Governance", percentage: 25, amount: 21325, icon: HeartHandshake }
  ],
  quarterlyDonations: [
    { quarter: "Q1 2025", amount: 18500 },
    { quarter: "Q2 2025", amount: 22300 },
    { quarter: "Q3 2025", amount: 25800 },
    { quarter: "Q4 2025", amount: 18700 }
  ],
  partners: [
    { name: "GreenEarth Foundation", focus: "Environmental", amount: 15000, description: "Reforestation and carbon capture initiatives" },
    { name: "Tech For All", focus: "Social", amount: 12500, description: "Digital literacy programs in underserved communities" },
    { name: "Clean Water Initiative", focus: "Environmental", amount: 10500, description: "Water purification systems in developing regions" },
    { name: "CryptoEducation", focus: "Social", amount: 9800, description: "Blockchain education for developing economies" },
    { name: "Ethical Governance Institute", focus: "Governance", amount: 21325, description: "Promoting ethical standards in business and technology" },
    { name: "Solar Power Access", focus: "Environmental", amount: 8620, description: "Solar power installations in remote communities" },
    { name: "Digital Equity Foundation", focus: "Social", amount: 7555, description: "Bridging the digital divide globally" }
  ]
};

export default function Impact() {
  return (
    <div className="flex flex-col gap-6 h-full p-4 pb-16 overflow-y-auto">
      <PageTitle title="ESG Impact" />
      
      {/* Hero Section */}
      <section className="w-full py-8 bg-gradient-to-br from-emerald-900 to-teal-800 rounded-2xl text-white">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Making a Difference Through DeFi</h2>
          <p className="text-lg text-center max-w-3xl mb-6">
            5% of all yield farming earnings are donated quarterly to vetted impact initiatives across Environmental, Social, and Governance causes.
          </p>
          <div className="text-4xl md:text-5xl font-bold">${impactData.totalDonated.toLocaleString()}</div>
          <div className="text-lg opacity-80">Total Donated</div>
        </div>
      </section>
      
      {/* Impact Categories */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impactData.impactCategories.map(category => {
          const IconComponent = category.icon;
          return (
            <Card key={category.name} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-2 ${
                    category.name === "Environmental" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : 
                    category.name === "Social" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <CardTitle>{category.name} Impact</CardTitle>
                </div>
                <CardDescription>
                  {category.percentage}% of donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${category.amount.toLocaleString()}</div>
                <Progress 
                  value={category.percentage} 
                  className={`h-2 mt-2 ${
                    category.name === "Environmental" ? "bg-emerald-100 dark:bg-emerald-950" : 
                    category.name === "Social" ? "bg-blue-100 dark:bg-blue-950" :
                    "bg-purple-100 dark:bg-purple-950"
                  }`}
                  indicatorClassName={
                    category.name === "Environmental" ? "bg-emerald-500 dark:bg-emerald-400" : 
                    category.name === "Social" ? "bg-blue-500 dark:bg-blue-400" :
                    "bg-purple-500 dark:bg-purple-400"
                  }
                />
              </CardContent>
            </Card>
          );
        })}
      </section>
      
      {/* Donation History and Partners */}
      <Tabs defaultValue="partners" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-md">
          <TabsTrigger value="partners">Impact Partners</TabsTrigger>
          <TabsTrigger value="history">Donation History</TabsTrigger>
          <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
        </TabsList>
        
        {/* Partners Tab */}
        <TabsContent value="partners" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactData.partners.map((partner, index) => (
              <Card key={index} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      partner.focus === "Environmental" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : 
                      partner.focus === "Social" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
                    }`}>
                      {partner.focus}
                    </div>
                  </div>
                  <CardDescription>
                    {partner.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Donation Amount</div>
                    <div className="text-xl font-bold">${partner.amount.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Quarterly Donations
              </CardTitle>
              <CardDescription>
                History of donations made from fund earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactData.quarterlyDonations.map((quarter, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div className="text-lg">{quarter.quarter}</div>
                    <div className="text-xl font-bold">${quarter.amount.toLocaleString()}</div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <div className="text-lg font-semibold">Total</div>
                  <div className="text-xl font-bold">${impactData.totalDonated.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Metrics Tab */}
        <TabsContent value="metrics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Impact Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of donations by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center border rounded-md bg-muted/50">
                <div className="text-center text-muted-foreground">
                  <div className="mb-2">Chart Visualization</div>
                  <div className="text-sm">(Impact distribution visualization placeholder)</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Donation Growth
                </CardTitle>
                <CardDescription>
                  Quarter-over-quarter growth in donation amounts
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center border rounded-md bg-muted/50">
                <div className="text-center text-muted-foreground">
                  <div className="mb-2">Chart Visualization</div>
                  <div className="text-sm">(Donation growth trend placeholder)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Vision Statement */}
      <section className="mt-2">
        <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Our ESG Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At Symmetros ESG Vision Fund, we believe that financial returns and positive impact can go hand in hand. 
              By allocating 5% of our yield farming earnings to carefully selected ESG initiatives, we aim to create a
              sustainable ecosystem that benefits both investors and society. Our multi-agent AI system not only
              optimizes for financial returns but also helps us identify and track the impact of our donations.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 
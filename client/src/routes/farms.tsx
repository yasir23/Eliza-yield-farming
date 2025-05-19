import { useState } from "react";
import PageTitle from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, Info, Search, SlidersHorizontal } from "lucide-react";

// Mock data for farm strategies
const farmStrategies = [
  {
    id: "1",
    name: "USDC-USDT LP",
    platform: "Raydium",
    tvl: 1250000,
    apy: 12.5,
    risk: "Low",
    type: "Stablecoin",
    description: "Stablecoin liquidity pool with auto-compounding rewards",
    tokens: ["USDC", "USDT"]
  },
  {
    id: "2",
    name: "SOL-USDC LP",
    platform: "Orca",
    tvl: 850000,
    apy: 18.2,
    risk: "Medium",
    type: "Major",
    description: "SOL-USDC liquidity pool with auto-compounding rewards",
    tokens: ["SOL", "USDC"]
  },
  {
    id: "3",
    name: "mSOL Staking",
    platform: "Marinade",
    tvl: 2100000,
    apy: 6.7,
    risk: "Low",
    type: "Staking",
    description: "Liquid staking for SOL with auto-compounding rewards",
    tokens: ["mSOL"]
  },
  {
    id: "4",
    name: "BONK-SOL LP",
    platform: "Raydium",
    tvl: 320000,
    apy: 45.6,
    risk: "High",
    type: "Meme",
    description: "BONK-SOL liquidity pool with auto-compounding rewards",
    tokens: ["BONK", "SOL"]
  },
  {
    id: "5",
    name: "JitoSOL Staking",
    platform: "Jito",
    tvl: 1800000,
    apy: 7.2,
    risk: "Low",
    type: "Staking",
    description: "Liquid staking for SOL with auto-compounding rewards from Jito",
    tokens: ["JitoSOL"]
  },
  {
    id: "6",
    name: "USDC Lending",
    platform: "Solend",
    tvl: 3200000,
    apy: 5.1,
    risk: "Low",
    type: "Lending",
    description: "USDC lending with auto-compounding interest rewards",
    tokens: ["USDC"]
  },
  {
    id: "7",
    name: "ETH-SOL LP",
    platform: "Orca",
    tvl: 680000,
    apy: 22.4,
    risk: "Medium",
    type: "Major",
    description: "ETH-SOL liquidity pool with auto-compounding rewards",
    tokens: ["ETH", "SOL"]
  },
  {
    id: "8",
    name: "MNGO-USDC LP",
    platform: "Mango Markets",
    tvl: 410000,
    apy: 38.7,
    risk: "High",
    type: "Altcoin",
    description: "MNGO-USDC liquidity pool with auto-compounding rewards",
    tokens: ["MNGO", "USDC"]
  },
];

// Farm type filter options
const farmTypes = ["All", "Stablecoin", "Major", "Staking", "Meme", "Lending", "Altcoin"];

// Risk level options
const riskLevels = ["All", "Low", "Medium", "High"];

export default function Farms() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  
  // Filter strategies based on active tab, search query, and filters
  const filteredStrategies = farmStrategies.filter(strategy => {
    // Tab filter
    if (activeTab === "staking" && strategy.type !== "Staking") return false;
    if (activeTab === "lp" && !strategy.name.includes("LP")) return false;
    if (activeTab === "lending" && strategy.type !== "Lending") return false;
    
    // Search filter
    if (searchQuery && !strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !strategy.platform.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !strategy.tokens.some(token => token.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Type filter
    if (selectedType !== "All" && strategy.type !== selectedType) return false;
    
    // Risk filter
    if (selectedRisk !== "All" && strategy.risk !== selectedRisk) return false;
    
    return true;
  });

  // Sort strategies by APY (highest first)
  const sortedStrategies = [...filteredStrategies].sort((a, b) => b.apy - a.apy);

  return (
    <div className="flex flex-col gap-6 h-full p-4 pb-16 overflow-y-auto">
      <PageTitle title="Yield Farms" />
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search farms..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </Button>
            
            <select 
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {farmTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select 
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
            >
              {riskLevels.map(level => (
                <option key={level} value={level}>{level} Risk</option>
              ))}
            </select>
          </div>
          
          <Button variant="outline" size="sm" className="gap-1.5 ml-auto">
            <ArrowUpDown className="h-3.5 w-3.5" />
            Sort
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All Farms</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="lp">Liquidity Pools</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          {sortedStrategies.length === 0 ? (
            <div className="text-center p-12 border rounded-lg">
              <p className="text-muted-foreground">No farms found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedStrategies.map(strategy => (
                <Card key={strategy.id} className="flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {strategy.name}
                          <Badge 
                            variant={strategy.risk === "Low" ? "outline" : 
                                    strategy.risk === "Medium" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {strategy.risk} Risk
                          </Badge>
                        </CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">{strategy.platform}</div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow pb-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">APY</div>
                        <div className="text-xl font-bold text-green-500">{strategy.apy.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">TVL</div>
                        <div className="text-xl font-bold">${(strategy.tvl / 1000000).toFixed(2)}M</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Assets</div>
                      <div className="flex gap-1 flex-wrap">
                        {strategy.tokens.map((token, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {token}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button className="w-full">Deposit</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 
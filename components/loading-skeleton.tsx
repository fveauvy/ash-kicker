import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="h-10 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-full">
              <CardHeader>
                <CardTitle className="h-6 bg-muted rounded w-3/4 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import Layout from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function RegisterLoading() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-16 px-4">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardContent className="p-10">
            <h1 className="mb-8 text-4xl sm:text-5xl font-bold text-gray-900 text-center">Register for AdamsHealth</h1>
            <div className="space-y-6">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <Skeleton className="h-2 w-1/2 rounded-full" />
                </div>
              </div>

              <div className="space-y-6">
                <Skeleton className="h-8 w-full" />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserInfo {
  name: string
  age: string
  gender: string
  medicalHistory: string
}

export function UserInfoDisplay({ userInfo }: { userInfo: UserInfo }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Age:</strong> {userInfo.age}
          </p>
          <p>
            <strong>Gender:</strong> {userInfo.gender}
          </p>
          <p>
            <strong>Medical History:</strong> {userInfo.medicalHistory}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


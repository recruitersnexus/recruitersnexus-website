import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({upcomingInterviews,userNotification}:any) {

  //console.log("Is upcomingInterviews an array?", Array.isArray(upcomingInterviews));
  
  return (
    <div className="space-y-8">
      {userNotification.map((user: any) => (
  <div key={user.id} className="">
    {upcomingInterviews.filter((interview: any) => interview.user_id === user.id && interview.is_confirmed === "unConfirmed")
      .map((interview: any, index: number) => (
        <div key={interview.id} className={`flex my-8 items-center `}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={`${user.image}`} />
            {/* <AvatarImage src="https://github.com/shadcn.png"/> */}
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{interview.slot}</div>
        </div>
      ))}
  </div>
))}
    </div>
  );
}

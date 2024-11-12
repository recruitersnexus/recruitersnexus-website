import React from 'react'
import { MainNav } from '../../dashboard/components/main-nav'
import { UserNav } from '../../dashboard/components/user-nav'
import { Search } from '../../dashboard/components/search'
import Setting from '../Setting'



export default function page({params}:{params:any}) {

return(
    <div>
    <Setting id={params.id}/>
    </div>
)
}





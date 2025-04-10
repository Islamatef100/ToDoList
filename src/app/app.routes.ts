import { Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { SignInComponent } from './Components/Shared Components/sign-in/sign-in.component';
import { RegisterComponent } from './Components/Shared Components/register/register.component';
import { ToDoComponent } from './Components/to-do/to-to.component';
import { ToDayTasksComponent } from './Components/to-day-tasks/to-day-tasks.component';
import { HomeComponent } from './Components/home/home.component';
import { CompletedTasksComponent } from './Components/completed-tasks/completed-tasks.component';
import { ErrorComponentComponent } from './Components/error-component/error-component.component';
import { ToDoDetailsComponent } from './Components/to-do-details/to-do-details.component';
import { authenticationGuard } from './guards/authentication.guard';
import { AddTaskComponent } from './Components/Shared Components/add-task/add-task.component';
export const routes: Routes = [
    {
        path:"",
        redirectTo : "signIn",
        pathMatch : 'full'
        
    },
    {
        path:"home",
        component : HomeComponent,
        canActivate: [authenticationGuard]
    },
    {
        path : "ToDoList",
        component : ToDoComponent,
        canActivate: [authenticationGuard]
    },
    {
        path : "TodayTasks",
        component : ToDayTasksComponent,
        canActivate: [authenticationGuard]
    },
    {
        path : "completedTasks",
        component : CompletedTasksComponent,
        canActivate: [authenticationGuard]
    },
    {
        path : "register",
        component : RegisterComponent
    },
    {
        path : "signIn",
        component : SignInComponent
    },
       {
        path : "contactUs",
        component : ConstantSourceNode,
        canActivate: [authenticationGuard]
    },
    {
        path : "aboutUs",
        component : AboutUsComponent
    },
    {
        path : "DetailsTask/:id",
        component : ToDoDetailsComponent,
        canActivate: [authenticationGuard]
    },
    {
        path : "addTask",
       component : AddTaskComponent,
       canActivate: [authenticationGuard]
   },
    {
        path : "**",
        component : ErrorComponentComponent
    },
];

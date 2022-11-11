import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RoleSelectionComponent } from "../auth/role-selection/role-selection.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'roleSelection',
                component: RoleSelectionComponent
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: '/auth/login'
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

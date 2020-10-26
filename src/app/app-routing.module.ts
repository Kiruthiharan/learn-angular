import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AnimationsComponent } from './animations/animations.component';
import { SoundAlertComponent } from './sound-alert/sound-alert.component';
import { TestingComponent } from './testing/testing.component';
import { UserTestComponent } from './testing/user-test/user-test.component';

export const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path: 'animations', component: AnimationsComponent},
    {path: 'alert', component: SoundAlertComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

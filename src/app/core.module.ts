import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './_services/recipe.service';
import { ShoppingListService } from './_services/shopping-list.service';

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        {
           provide: HTTP_INTERCEPTORS,
           useClass: AuthInterceptorService,
           multi: true
        }
    ]
})
export class CoreModule {}
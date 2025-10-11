import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'


export const authGuard: CanActivateFn = () => {
    const router = inject(Router) // if not already injected
    const allowed = Math.random() > 0.5 // simulated true/false
    if (allowed) { return true }
    else { // indicate next navigation
        return router.createUrlTree(['/forbidden-component']) // no navigate inside navigation
    }
}
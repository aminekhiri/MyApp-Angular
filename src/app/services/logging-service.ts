import { Injectable, signal } from '@angular/core';
import { LogEntry } from '../models/log-entry';

@Injectable({
  providedIn: 'root'
})
export class LoggingService{


  private readonly _entries = signal<LogEntry[]>([]);

  readonly entries = this._entries.asReadonly();

  public getEntries() : LogEntry[] {
    return this.entries();
  }

  public log(message: string, scope?: string) : void {

    // on crée un nouveau log avec les parametres de la fonction et on le rentre dans la liste de log
    const newLog: LogEntry = {
      id: this.generateId(), // j'ai mis un id direct parce que il ne peut âs etre undifined dans l'interface 
      message,
      scope,
      timestamp: new Date().getFullYear().toString()
    };
    this.entries().push(newLog);

  }

  //c'ets pour creer un id unique qui depend de la taille du tableau pour qu'ils soieent tous unique 
  private generateId(): string {
    return (this.entries.length + 1).toString(); //le toString c'ets parce que l'id est en string dans l'interface 
  }


  public clear() : void {
    this.entries().splice(0, this.entries().length);
  }

}

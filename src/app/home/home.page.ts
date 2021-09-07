import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];

  constructor(private alertCtrl: AlertController,private toastCtrl: ToastController) {
      const taskJson = localStorage.getItem('LocalDB');
      if(taskJson!=null){
        this.tasks = JSON.parse(taskJson);
      }
    }


  async addTask(){
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs:[
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'Digite o nome da tarefa aqui'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            console.log('clicked cancel');
          }
        },
        {
          text: 'Adicionar',
          handler: (form)=>{
            this.add(form.newTask);
          }
        }
      ]
    });
    alert.present();
  }
  async add(newTask: string){
    if(newTask.trim().length<1){
      const toast = await this.toastCtrl.create({
        message: 'O que deseja fazer?',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    const task = {name: newTask, done: false};
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  updateLocalStorage(){
    localStorage.setItem('LocalDB', JSON.stringify(this.tasks));
  }
  editTask(){
    alert('editou');
  }
  deleteTask(){
    alert('removeu');
  }

}

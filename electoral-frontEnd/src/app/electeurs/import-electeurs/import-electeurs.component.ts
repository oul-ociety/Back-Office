import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElecteursService } from '../../services/electeur.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-import-electeurs',
  standalone: true,
  imports : [CommonModule, FormsModule],
  templateUrl: './import-electeurs.component.html',
  styleUrls: ['./import-electeurs.component.css']
})
export class ImportElecteursComponent {
  file: File | null = null;
  checksum: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private electeursService: ElecteursService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0] || null;
  }

  onSubmit() {
    if (!this.file || !this.checksum) {
      this.errorMessage = 'Veuillez sélectionner un fichier et entrer une empreinte SHA256.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('checksum', this.checksum);

    this.electeursService.uploadFile(formData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Fichier importé avec succès.';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l’importation du fichier.';
        this.successMessage = '';
      }
    });
  }
}

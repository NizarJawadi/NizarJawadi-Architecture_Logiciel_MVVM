import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieService } from '../Services/CategorieServices';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent {
  categorieForm!: FormGroup;
  categories: { id: number; nom: string }[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private categorieService: CategorieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchCategories();

    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  fetchCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des catégories.';
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.categorieForm.valid) {
      this.categorieService.addCategorie(this.categorieForm.value).subscribe(
        (categorie ) => {
          this.categories.push(categorie);
          this.successMessage = 'Catégorie ajoutée avec succès !';
          this.categorieForm.reset();
        },
        (error : any ) => {
          this.errorMessage = 'Erreur lors de l\'ajout de la catégorie.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir le champ requis.';
    }
  }

  deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(
      () => {
        this.categories = this.categories.filter((c) => c.id !== id);
        this.successMessage = 'Catégorie supprimée avec succès.';
      },
      (error : any) => {
        this.errorMessage = 'Erreur lors de la suppression de la catégorie.';
        console.error(error);
      }
    );
  }
}

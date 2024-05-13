import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './repository-list.component';
import { Repository } from './repository.model';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repositories', () => {
    const repositories: Repository[] = [
      { name: 'Repo 1', description: 'Description 1', topics: ['Topic 1', 'Topic 2'] },
      { name: 'Repo 2', description: 'Description 2', topics: ['Topic 3', 'Topic 4'] }
    ];
  
    component.repositories = repositories;
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.repository-card').length).toBe(2);
  
    const repoElements = compiled.querySelectorAll('.repository-card');
    repoElements.forEach((repoElement: HTMLElement, index: number) => {
      const repo: Repository = repositories[index];
      const h3Element = repoElement.querySelector('h3');
      expect(h3Element?.textContent).toContain(repo.name);
      const pElement = repoElement.querySelector('p');
      expect(pElement?.textContent).toContain(repo.description);
      const badgeElements = repoElement.querySelectorAll('.badge') as NodeListOf<HTMLElement>;
      expect(badgeElements.length).toBe(repo.topics.length);
      badgeElements.forEach((badgeElement: HTMLElement, i: number) => {
        expect(badgeElement.textContent).toContain(repo.topics[i]);
      });
    });
  });

  it('should not display repositories if repositories array is empty', () => {
    component.repositories = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.repository-card').length).toBe(0);
  });
});

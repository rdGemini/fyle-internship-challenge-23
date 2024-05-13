import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { UserDetails } from './user-details/user-details.model';
import { of } from 'rxjs';
import { Repository } from './repository-list/repository.model';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user details', () => {
    const mockUserDetails: UserDetails = {
      name: 'John Doe',
      bio: 'Software Engineer',
      location: 'New York',
      twitter_username: 'johndoe',
      blog: 'https://example.com',
      avatar_url: 'https://example.com/avatar.jpg',
      html_url: 'https://github.com/johndoe',
      // Add other properties here as needed
    };
  
    service.fetchUserDetails('johndoe').subscribe((userDetails) => {
      expect(userDetails).toEqual(mockUserDetails);
    });
  
    const req = httpMock.expectOne('https://api.github.com/users/johndoe');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserDetails);
  });

  it('fetchRepositories should return Observable<Repository[]>', () => {
    const mockRepositories: Repository[] = [ /* mock Repository objects */ ];

    service.fetchRepositories('test-user', 10, 1).subscribe(repositories => {
      expect(repositories).toEqual(mockRepositories);
    });

    const req = httpMock.expectOne('https://api.github.com/users/test-user/repos?per_page=10&page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepositories);
  });

  it('searchRepositories should return Observable<SearchResponse>', () => {
    const mockSearchResponse: any = { items: [ /* mock items */ ] };

    service.searchRepositories('test-user', 'search-query', 10, 1).subscribe(response => {
      expect(response).toEqual(mockSearchResponse);
    });

    const req = httpMock.expectOne('https://api.github.com/search/repositories?q=search-query+user:test-user&per_page=10&page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchResponse);
  });
});

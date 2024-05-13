import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage = 1;
  searchRepo: string = '';
  username: string = '';
  totalRepositories = 0;
  currentUsername = '';
  perPage = 10;
  userDetails: any;
  repositories: any[] = [];
  loading: boolean = false;
  title = 'fyle-frontend-challenge';

  constructor(private http: HttpClient) { }

  fetchUserAndRepositories() {
    if (this.searchRepo) {
      this.searchRepositories();
    } else {
      const username = (document.getElementById('username') as HTMLInputElement).value;
      this.perPage = parseInt((document.getElementById('perPage') as HTMLInputElement).value) || this.perPage;

      this.currentPage = 1;
      this.loading = true;

      this.userDetails = null;
      this.repositories = [];
      this.displayRepositories(this.repositories);
      (document.getElementById('searchRepo') as HTMLInputElement).value = '';


      this.http.get(`https://api.github.com/users/${username}`).subscribe(
        (userData: any) => {
          if (userData && !userData.message) {
            this.displayUserDetails(userData);
            this.fetchRepositories();
            this.loading = false;
          } else {
            this.displayEmptyState();
            this.loading = false;
          }
        },
        (error) => {
          this.displayEmptyState();
          console.error('Error fetching user details:', error);
          this.loading = false;
        }
      );
    }
  }

  displayEmptyState() {
    const userDetailsDiv = document.getElementById('userDetails');
    if (userDetailsDiv) {
      userDetailsDiv.innerHTML = '<p>User not found</p>';
      const pElement = userDetailsDiv.querySelector('p');
      if (pElement) {
        pElement.style.textAlign = 'center';
      }
    }
  }

  displayUserDetails(userDetails: any) {
    const userDetailsDiv = document.getElementById('userDetails');
    if (userDetailsDiv) {
      userDetailsDiv.innerHTML = '';

      if (userDetails.message === 'Not Found') {
        userDetailsDiv.innerHTML = '<p">User not found</p>';
        return;
      }

      const userDetailsCard = document.createElement('div');
      userDetailsCard.classList.add('row');

      const columnDiv = document.createElement('div');
      columnDiv.classList.add('col-md-3', 'text-md-right');
      userDetailsCard.appendChild(columnDiv);

      const column1Div = document.createElement('div');
      column1Div.classList.add('col-md-3', 'text-md-right');
      column1Div.classList.add('text-center', 'mx-auto');

      column1Div.innerHTML = `
      <img src="${userDetails.avatar_url}" alt="User Profile Image" class="img-fluid mb-3 rounded-full" style="max-width: 150px; display: block; margin: 0 auto;">
        <p><a href="${userDetails.html_url}" target="_blank">${userDetails.html_url}</a></p>
      `;
      userDetailsCard.appendChild(column1Div);

      const column2Div = document.createElement('div');
      column2Div.classList.add('col-md-6');

      column2Div.innerHTML = `
        <h3 class="text-xl font-bold">${userDetails.name || 'Not available'}</h3>
        ${userDetails.bio ? `<p>${userDetails.bio}</p>` : ''}
        <p><strong>📍</strong> ${userDetails.location || 'Not available'}</p>
      `;

      if (userDetails.twitter_username) {
        column2Div.innerHTML += `<p><i>Twitter:</i> <a href="https://twitter.com/${userDetails.twitter_username}" target="_blank">${userDetails.twitter_username}</a></p>`;
      }
      if (userDetails.blog) {
        column2Div.innerHTML += `<p><i>Blog:</i> <a href="${userDetails.blog}" target="_blank">${userDetails.blog}</a></p>`;
      }

      userDetailsCard.appendChild(column2Div);
      userDetailsDiv.appendChild(userDetailsCard);
    }
  }

  fetchRepositories() {
    const username = (document.getElementById('username') as HTMLInputElement).value;

    // Reset currentPage if the username changes
    if (this.currentUsername !== username) {
      this.currentPage = 1;
      this.currentUsername = username;
    }

    console.log('Fetching repositories for username:', username);

    this.loading = true;

    this.http.get(`https://api.github.com/users/${username}/repos?per_page=${this.perPage}&page=${this.currentPage}`)
      .subscribe(
        (data: any) => {
          console.log('Repositories data:', data);
          this.totalRepositories = data.length;
          this.displayRepositories(data);
          this.updateButtonStates();
        },
        (error) => {
          console.error('Error fetching repositories:', error);
          this.loading = false;
        }
      );
  }

  searchRepositories() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const searchRepo = (document.getElementById('searchRepo') as HTMLInputElement).value;
    this.perPage = parseInt((document.getElementById('perPage') as HTMLInputElement).value) || this.perPage;

    // Reset currentPage for new searches
    this.currentPage = 1;
    this.loading = true;

    this.http.get(`https://api.github.com/search/repositories?q=${searchRepo}+user:${username}&per_page=${this.perPage}&page=${this.currentPage}`)
      .subscribe(
        (data: any) => {
          const filteredRepositories = data.items || [];
          this.totalRepositories = filteredRepositories.length;
          this.displayRepositories(filteredRepositories);
          this.updateButtonStates();
        },
        () => {
          this.loading = false;
        }
      );
  }

  goToPage(direction: string) {
    if (this.searchRepo) {
      this.searchRepositories();
    } else {
      if (direction === 'prev') {
        this.currentPage = Math.max(1, this.currentPage - 1);
      } else if (direction === 'next' && this.totalRepositories > 0) {
        this.currentPage++;
      }

      this.fetchRepositories();
    }
  }

  updatePageNumber() {
    document.getElementById('currentPage')!.innerText = `Page ${this.currentPage}`;
  }

  updateButtonStates() {
    (document.getElementById('prevPageBtn') as HTMLButtonElement).disabled = this.currentPage === 1;
    (document.getElementById('nextPageBtn') as HTMLButtonElement).disabled = this.totalRepositories < this.perPage;
    this.updatePageNumber();
  }

  displayRepositories(repositories: any[]) {
    const column1Div = document.getElementById('column1')!;
    const column2Div = document.getElementById('column2')!;
    column1Div.innerHTML = '';
    column2Div.innerHTML = '';

    if (repositories.length === 0) {
      column1Div.innerHTML = '<p>No repositories found</p>';
      return;
    }

    repositories.forEach((repo, index) => {
      const repoDiv = document.createElement('div');
      repoDiv.classList.add('bg-gray-900', 'p-4', 'm-4', 'border', 'border-gray-300', 'rounded');
      repoDiv.innerHTML = `
        <h3 class="text-lg font-semibold mb-2 text-white">${repo.name}</h3>
        <p class="text-sm text-gray-300 mb-2">${repo.description || 'No description available'}</p>
      `;

      // Display topics
      if (repo.topics && repo.topics.length > 0) {
        const topicsDiv = document.createElement('div');
        topicsDiv.classList.add('mb-2');
        topicsDiv.innerHTML = '<strong class="mr-2 text-blue-200">Topics : </strong>';
        repo.topics.forEach((topic: string) => {
          const badgeSpan = document.createElement('span');
          badgeSpan.classList.add('badge', 'bg-blue-500', 'text-blue-800', 'py-1', 'px-2', 'rounded', 'mr-2');
          badgeSpan.textContent = topic;
          topicsDiv.appendChild(badgeSpan);
        });
        repoDiv.appendChild(topicsDiv);
      }

      // Distribute repositories between columns
      if (index % 2 === 0) {
        column1Div.appendChild(repoDiv);
      } else {
        column2Div.appendChild(repoDiv);
      }
    });
  }
}

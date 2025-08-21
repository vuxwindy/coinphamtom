(function() {
  // Global variables
  let currentUser = null;
  let userNFTs = [];
  let userActivity = [];
  let pagination = { page: 1, pageSize: 10, total: 0 };
  let activityPagination = { page: 1, pageSize: 5, total: 0 };

  // Get current user from localStorage
  function getCurrentUser() {
    const uid = localStorage.getItem('userUid');
    const wallet = localStorage.getItem('walletAddress');
    if (uid) return { uid };
    if (wallet) return { uid: `wallet_${wallet.toLowerCase()}` };
    return null;
  }

  // Initialize profile page
  async function initProfile() {
    try {
      // Check authentication
      const user = getCurrentUser();
      if (!user) {
        showNotification('Please sign in or connect wallet to view profile', 'warning');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
      }

      currentUser = user;
      console.log('Loading profile for user:', user.uid);

      // Show loading state
      showLoadingState();

      // Load all profile data
      await Promise.all([
        loadUserInfo(),
        loadBalances(),
        loadGameStats(),
        loadUserNFTs(),
        loadRecentActivity()
      ]);

      // Set up event listeners
      setupEventListeners();

      // Hide loading state
      hideLoadingState();

    } catch (error) {
      console.error('Error initializing profile:', error);
      showNotification('Error loading profile data', 'error');
      hideLoadingState();
    }
  }

  // Load user information
  async function loadUserInfo() {
    try {
      const userInfo = await window.FirebaseService.getUserProfile(currentUser.uid);
      
      if (userInfo.success) {
        const data = userInfo.data;
        
        // Update profile header
        document.getElementById('profileUsername').textContent = data.username || 'User Profile';
        document.getElementById('walletAddress').textContent = data.walletAddress || 'Not Connected';
        document.getElementById('memberSince').textContent = formatDate(data.createdAt);
        document.getElementById('totalNFTs').textContent = data.totalNFTs || 0;
        document.getElementById('userLevel').textContent = calculateUserLevel(data.totalEarned || 0);

        // Update user info card
        document.getElementById('userId').textContent = currentUser.uid;
        document.getElementById('userEmail').textContent = data.email || 'Not provided';
        document.getElementById('userStatus').textContent = data.status || 'Active';
        document.getElementById('lastLogin').textContent = formatDate(data.lastLogin);

        // Update referral count
        document.getElementById('referralCount').textContent = data.referralCount || 0;

      } else {
        // Set default values if no profile found
        document.getElementById('profileUsername').textContent = 'User Profile';
        document.getElementById('walletAddress').textContent = 'Not Connected';
        document.getElementById('memberSince').textContent = 'Today';
        document.getElementById('totalNFTs').textContent = '0';
        document.getElementById('userLevel').textContent = '1';
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  }

  // Load user balances
  async function loadBalances() {
    try {
      // Load PPO balance
      const ppoResult = await window.FirebaseService.getTokenBalance(currentUser.uid);
      if (ppoResult.success) {
        const ppoBalance = ppoResult.data.ppoBalance || 0;
        document.getElementById('ppoBalance').textContent = ppoBalance.toFixed(2);
      }

      // Load USD balance
      const usdResult = await window.FirebaseService.getUserBalance(currentUser.uid);
      if (usdResult.success) {
        const usdBalance = usdResult.data.usdBalance || 0;
        document.getElementById('usdBalance').textContent = `$${usdBalance.toFixed(2)}`;
      }

      // Load total profit (from investment system)
      const profitResult = await window.FirebaseService.getUserProfit(currentUser.uid);
      if (profitResult.success) {
        const totalProfit = profitResult.data.totalProfit || 0;
        document.getElementById('totalProfit').textContent = `$${totalProfit.toFixed(2)}`;
      }

    } catch (error) {
      console.error('Error loading balances:', error);
    }
  }

  // Load game statistics
  async function loadGameStats() {
    try {
      const gameStats = await window.FirebaseService.getUserGameStats(currentUser.uid);
      
      if (gameStats.success) {
        const stats = gameStats.data;
        document.getElementById('gamesPlayed').textContent = stats.gamesPlayed || 0;
        document.getElementById('bestScore').textContent = stats.bestScore || 0;
        document.getElementById('totalEarned').textContent = `${stats.totalEarned || 0} PPO`;
        document.getElementById('winRate').textContent = `${stats.winRate || 0}%`;
      } else {
        // Set default values
        document.getElementById('gamesPlayed').textContent = '0';
        document.getElementById('bestScore').textContent = '0';
        document.getElementById('totalEarned').textContent = '0 PPO';
        document.getElementById('winRate').textContent = '0%';
      }
    } catch (error) {
      console.error('Error loading game stats:', error);
    }
  }

  // Load user NFTs
  async function loadUserNFTs() {
    try {
      const nftsResult = await window.FirebaseService.getUserNFTs(currentUser.uid);
      userNFTs = nftsResult.success ? nftsResult.data : [];
      
      // Update total NFTs count
      document.getElementById('totalNFTs').textContent = userNFTs.length;
      
      // Render NFTs
      renderNFTs(userNFTs);
      
    } catch (error) {
      console.error('Error loading NFTs:', error);
      userNFTs = [];
      renderNFTs([]);
    }
  }

  // Render NFTs with filtering and pagination
  function renderNFTs(nfts) {
    const grid = document.getElementById('nftGrid');
    if (!grid) return;

    // Apply filters
    let filteredNFTs = filterNFTs(nfts);

    if (!filteredNFTs || !filteredNFTs.length) {
      grid.innerHTML = `
        <div class="col-12">
          <div class="text-center py-5">
            <i class="fas fa-images fa-3x text-muted mb-3"></i>
            <h5 class="text-white-50">No NFTs found</h5>
            <p class="text-white-50">Start collecting NFTs by opening BlindBoxes or playing games!</p>
            <button class="btn btn-primary" onclick="openBlindBox()">
              <i class="fas fa-gift me-2"></i>Open BlindBox
            </button>
          </div>
        </div>
      `;
      document.getElementById('nftPagination').innerHTML = '';
      return;
    }

    // Apply pagination
    pagination.total = filteredNFTs.length;
    const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
    const page = Math.min(Math.max(1, pagination.page), totalPages);
    const start = (page - 1) * pagination.pageSize;
    const end = Math.min(start + pagination.pageSize, pagination.total);
    const pageItems = filteredNFTs.slice(start, end);

    // Render NFT cards
    grid.innerHTML = pageItems.map(nft => `
      <div class="col-lg-4 col-md-6">
        <div class="nft-card">
          <img src="${nft.image || 'images/default-nft.jpg'}" class="nft-image" alt="${nft.name}" onerror="this.src='images/default-nft.jpg'">
          <div class="nft-info">
            <h6 class="nft-name">${nft.name}</h6>
            <span class="nft-rarity rarity-${getRarityClass(nft.rarity)}">${nft.rarity}</span>
            <p class="text-white-50 small mb-3">${nft.description || 'No description available'}</p>
            <div class="nft-actions">
              <button class="btn btn-sm btn-outline-primary" onclick="viewNFT('${nft.id}')">
                <i class="fas fa-eye"></i> View
              </button>
              <button class="btn btn-sm btn-outline-success" onclick="listNFT('${nft.id}')">
                <i class="fas fa-tag"></i> List
              </button>
              <button class="btn btn-sm btn-outline-info" onclick="shareNFT('${nft.id}')">
                <i class="fas fa-share"></i> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Render pagination
    renderPagination(page, totalPages);
  }

  // Filter NFTs based on search and filters
  function filterNFTs(nfts) {
    const rarityFilter = document.getElementById('rarityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchNFT').value.toLowerCase();

    return nfts.filter(nft => {
      const matchesRarity = !rarityFilter || nft.rarity.toLowerCase().includes(rarityFilter.toLowerCase());
      const matchesStatus = !statusFilter || nft.status === statusFilter;
      const matchesSearch = !searchTerm || 
        nft.name.toLowerCase().includes(searchTerm) || 
        nft.description.toLowerCase().includes(searchTerm);

      return matchesRarity && matchesStatus && matchesSearch;
    });
  }

  // Get rarity CSS class
  function getRarityClass(rarity) {
    if (rarity.includes('Mythic') || rarity.includes('SSS')) return 'mythic';
    if (rarity.includes('Legendary') || rarity.includes('★★★★★')) return 'legendary';
    if (rarity.includes('Epic') || rarity.includes('★★★★')) return 'epic';
    if (rarity.includes('Rare') || rarity.includes('★★★')) return 'rare';
    return 'common';
  }

  // Render pagination controls
  function renderPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('nftPagination');
    
    if (totalPages <= 1) {
      paginationElement.innerHTML = '';
      return;
    }

    paginationElement.innerHTML = `
      <div class="text-white-50">
        Showing ${((currentPage - 1) * pagination.pageSize) + 1} to ${Math.min(currentPage * pagination.pageSize, pagination.total)} of ${pagination.total} NFTs
      </div>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-light" ${currentPage <= 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
          <i class="fas fa-chevron-left"></i> Prev
        </button>
        <span class="btn btn-sm btn-outline-light disabled">${currentPage} / ${totalPages}</span>
        <button class="btn btn-sm btn-outline-light" ${currentPage >= totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
          Next <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  // Change page
  function changePage(page) {
    pagination.page = page;
    renderNFTs(userNFTs);
  }

  // Load recent activity
  async function loadRecentActivity() {
    try {
      const activityResult = await window.FirebaseService.getUserActivity(currentUser.uid);
      userActivity = activityResult.success ? activityResult.data : [];
      
      renderActivity(userActivity.slice(0, activityPagination.pageSize));
      
    } catch (error) {
      console.error('Error loading activity:', error);
      userActivity = [];
      renderActivity([]);
    }
  }

  // Render activity list
  function renderActivity(activities) {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    if (!activities || !activities.length) {
      activityList.innerHTML = `
        <div class="text-center py-4">
          <i class="fas fa-history fa-2x text-muted mb-3"></i>
          <p class="text-white-50">No recent activity</p>
        </div>
      `;
      return;
    }

    activityList.innerHTML = activities.map(activity => `
      <div class="activity-item">
        <div class="activity-icon bg-${getActivityIconColor(activity.type)}">
          <i class="fas fa-${getActivityIcon(activity.type)}"></i>
        </div>
        <div class="activity-content">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-time">${formatDate(activity.timestamp)}</div>
        </div>
        ${activity.amount ? `<div class="activity-amount text-${getActivityAmountColor(activity.type)}">${activity.amount}</div>` : ''}
      </div>
    `).join('');
  }

  // Get activity icon
  function getActivityIcon(type) {
    const icons = {
      'deposit': 'arrow-down',
      'withdraw': 'arrow-up',
      'game': 'gamepad',
      'nft': 'image',
      'referral': 'users',
      'investment': 'chart-line',
      'blindbox': 'gift'
    };
    return icons[type] || 'circle';
  }

  // Get activity icon color
  function getActivityIconColor(type) {
    const colors = {
      'deposit': 'success',
      'withdraw': 'danger',
      'game': 'primary',
      'nft': 'warning',
      'referral': 'info',
      'investment': 'success',
      'blindbox': 'warning'
    };
    return colors[type] || 'secondary';
  }

  // Get activity amount color
  function getActivityAmountColor(type) {
    const colors = {
      'deposit': 'success',
      'withdraw': 'danger',
      'game': 'primary',
      'nft': 'warning',
      'referral': 'info',
      'investment': 'success',
      'blindbox': 'warning'
    };
    return colors[type] || 'white';
  }

  // Load more activity
  function loadMoreActivity() {
    const start = activityPagination.page * activityPagination.pageSize;
    const end = start + activityPagination.pageSize;
    const moreActivity = userActivity.slice(start, end);
    
    if (moreActivity.length > 0) {
      const currentActivity = document.getElementById('activityList').innerHTML;
      const newActivity = moreActivity.map(activity => `
        <div class="activity-item">
          <div class="activity-icon bg-${getActivityIconColor(activity.type)}">
            <i class="fas fa-${getActivityIcon(activity.type)}"></i>
          </div>
          <div class="activity-content">
            <div class="activity-title">${activity.title}</div>
            <div class="activity-time">${formatDate(activity.timestamp)}</div>
          </div>
          ${activity.amount ? `<div class="activity-amount text-${getActivityAmountColor(activity.type)}">${activity.amount}</div>` : ''}
        </div>
      `).join('');
      
      document.getElementById('activityList').innerHTML = currentActivity + newActivity;
      activityPagination.page++;
    }
  }

  // Calculate user level based on total earned
  function calculateUserLevel(totalEarned) {
    if (totalEarned >= 10000) return 10;
    if (totalEarned >= 5000) return 9;
    if (totalEarned >= 2500) return 8;
    if (totalEarned >= 1000) return 7;
    if (totalEarned >= 500) return 6;
    if (totalEarned >= 250) return 5;
    if (totalEarned >= 100) return 4;
    if (totalEarned >= 50) return 3;
    if (totalEarned >= 10) return 2;
    return 1;
  }

  // Format date
  function formatDate(timestamp) {
    if (!timestamp) return 'Unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return date.toLocaleDateString();
  }

  // Show loading state
  function showLoadingState() {
    const elements = ['nftGrid', 'activityList'];
    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = `
          <div class="col-12">
            <div class="loading-skeleton" style="height: 200px; border-radius: 10px;"></div>
          </div>
        `;
      }
    });
  }

  // Hide loading state
  function hideLoadingState() {
    // Loading states will be replaced by actual content
  }

  // Set up event listeners
  function setupEventListeners() {
    // NFT filters
    document.getElementById('rarityFilter').addEventListener('change', () => {
      pagination.page = 1;
      renderNFTs(userNFTs);
    });

    document.getElementById('statusFilter').addEventListener('change', () => {
      pagination.page = 1;
      renderNFTs(userNFTs);
    });

    document.getElementById('searchNFT').addEventListener('input', () => {
      pagination.page = 1;
      renderNFTs(userNFTs);
    });
  }

  // Modal functions
  function editProfile() {
    const modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
    modal.show();
  }

  function saveProfile() {
    const username = document.getElementById('editUsername').value;
    const bio = document.getElementById('editBio').value;
    
    if (!username.trim()) {
      showNotification('Username is required', 'error');
      return;
    }

    // Save profile logic here
    showNotification('Profile updated successfully', 'success');
    bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
    
    // Reload user info
    loadUserInfo();
  }

  function listNFT(nftId = null) {
    const modal = new bootstrap.Modal(document.getElementById('listNFTModal'));
    
    if (nftId) {
      // Pre-select the NFT
      document.getElementById('nftSelect').value = nftId;
    } else {
      // Populate NFT select dropdown
      const nftSelect = document.getElementById('nftSelect');
      nftSelect.innerHTML = '<option value="">Choose an NFT to list</option>';
      
      userNFTs.forEach(nft => {
        const option = document.createElement('option');
        option.value = nft.id;
        option.textContent = nft.name;
        nftSelect.appendChild(option);
      });
    }
    
    modal.show();
  }

  function confirmListNFT() {
    const nftId = document.getElementById('nftSelect').value;
    const price = document.getElementById('nftPrice').value;
    const description = document.getElementById('nftDescription').value;
    
    if (!nftId || !price || price <= 0) {
      showNotification('Please select an NFT and enter a valid price', 'error');
      return;
    }

    // List NFT logic here
    showNotification('NFT listed successfully', 'success');
    bootstrap.Modal.getInstance(document.getElementById('listNFTModal')).hide();
    
    // Reload NFTs
    loadUserNFTs();
  }

  // Action functions
  function openBlindBox() {
    window.location.href = 'blindbox.html';
  }

  function viewNFT(nftId) {
    // View NFT details logic
    showNotification('NFT details feature coming soon', 'info');
  }

  function shareNFT(nftId) {
    // Share NFT logic
    if (navigator.share) {
      navigator.share({
        title: 'Check out my NFT!',
        text: 'I just got this amazing NFT from COINPAYOT!',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showNotification('Profile link copied to clipboard', 'success');
    }
  }

  function shareProfile() {
    if (navigator.share) {
      navigator.share({
        title: 'My COINPAYOT Profile',
        text: 'Check out my NFT collection and achievements!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Profile link copied to clipboard', 'success');
    }
  }

  function showDepositModal() {
    window.location.href = 'dashboard.html#deposit';
  }

  function showWithdrawModal() {
    window.location.href = 'dashboard.html#withdraw';
  }

  function showConvertModal() {
    showNotification('Convert feature coming soon', 'info');
  }

  function viewProfitHistory() {
    window.location.href = 'dashboard.html#history';
  }

  function viewReferrals() {
    window.location.href = 'referral.html';
  }

  // Show notification
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', initProfile);

  // Expose functions globally
  window.editProfile = editProfile;
  window.saveProfile = saveProfile;
  window.listNFT = listNFT;
  window.confirmListNFT = confirmListNFT;
  window.openBlindBox = openBlindBox;
  window.viewNFT = viewNFT;
  window.shareNFT = shareNFT;
  window.shareProfile = shareProfile;
  window.showDepositModal = showDepositModal;
  window.showWithdrawModal = showWithdrawModal;
  window.showConvertModal = showConvertModal;
  window.viewProfitHistory = viewProfitHistory;
  window.viewReferrals = viewReferrals;
  window.loadMoreActivity = loadMoreActivity;
  window.changePage = changePage;

})();



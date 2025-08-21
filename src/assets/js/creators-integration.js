// Creators Integration - Firebase Enhanced
// Quản lý Creator system với Firebase Firestore thay vì localStorage

const CreatorsIntegration = {
    // State management
    creatorsData: {
        creators: [],
        userCreator: null,
        topPlayers: [],
        categories: ['Art', 'Music', 'Video', 'Game', 'NFT', 'Other'],
        loading: false,
        error: null,
        initialized: false
    },

    // Periodic update interval ID
    updateInterval: null,

    // Initialize creators system
    async init() {
        console.log('🎨 Initializing Creators Integration with Firebase...');
        
        try {
            // Wait for Firebase to be available
            await this.waitForFirebase();
            
            // Load initial data
            await this.loadCreatorsData();
            
            // Set up periodic updates
            this.startPeriodicUpdates();
            
            // Set up event listeners
            this.setupEventListeners();
            
            this.creatorsData.initialized = true;
            console.log('✅ Creators Integration initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Creators Integration:', error);
            this.creatorsData.error = error.message;
            this.showNotification(`Failed to initialize: ${error.message}`, 'error');
        }
    },

    // Wait for Firebase to be available
    async waitForFirebase(maxWaitTime = 10000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < maxWaitTime) {
            if (window.FirebaseService && window.firebase && window.firebase.db) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        throw new Error('Firebase initialization timeout - please refresh the page');
    },

    // Load creators data from Firebase
    async loadCreatorsData() {
        try {
            this.creatorsData.loading = true;
            this.creatorsData.error = null;
            
            // Check if Firebase is available
            if (!window.FirebaseService) {
                throw new Error('Firebase service not available');
            }
            
            // Get all creators
            const result = await window.FirebaseService.getAllCreators({
                limit: 100
            });
            
            if (result.success) {
                this.creatorsData.creators = result.data || [];
                console.log(`🎨 Loaded ${result.data.length} creators from Firebase`);
                
                // Get current user's creator profile
                const uid = this.getCurrentUserId();
                if (uid) {
                    const userCreatorResult = await window.FirebaseService.getCreatorProfile(uid);
                    if (userCreatorResult.success) {
                        this.creatorsData.userCreator = userCreatorResult.data;
                    }
                }

                // Load top players for the month
                await this.loadTopPlayers();
            } else {
                console.error('❌ Failed to load creators:', result.error);
                this.creatorsData.error = result.error;
                throw new Error(result.error);
            }
            
            this.creatorsData.loading = false;
        } catch (error) {
            console.error('❌ Error loading creators data:', error);
            this.creatorsData.loading = false;
            this.creatorsData.error = error.message;
            this.showNotification(`Failed to load data: ${error.message}`, 'error');
        }
    },

    // Load top players for the month
    async loadTopPlayers() {
        try {
            // Get current month's top players based on game stats
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            
            // This would typically come from Firebase based on game statistics
            // For now, we'll simulate top players based on user stats
            const topPlayersResult = await this.getTopPlayersForMonth(currentMonth, currentYear);
            
            if (topPlayersResult.success) {
                this.creatorsData.topPlayers = topPlayersResult.data || [];
                console.log(`🏆 Loaded ${topPlayersResult.data.length} top players for ${currentMonth}/${currentYear}`);
            }
        } catch (error) {
            console.error('❌ Error loading top players:', error);
            this.creatorsData.topPlayers = [];
        }
    },

    // Get top players for specific month
    async getTopPlayersForMonth(month, year) {
        try {
            // This would be a Firebase query to get top players based on:
            // - Total score
            // - Hit rate
            // - Games played
            // - PPO earned
            // - NFTs collected
            
            // For now, return empty array - no sample data
            const topPlayers = [];

            return { success: true, data: topPlayers };
        } catch (error) {
            console.error('❌ Error getting top players:', error);
            return { success: false, error: error.message };
        }
    },

    // Register as creator
    async registerCreator(creatorData) {
        try {
            // Validate input data
            if (!creatorData.name || !creatorData.bio) {
                throw new Error('Missing required fields: name and bio are required');
            }

            if (creatorData.name.length > 100) {
                throw new Error('Name must be 100 characters or less');
            }

            if (creatorData.bio.length > 500) {
                throw new Error('Bio must be 500 characters or less');
            }

            // Get current user ID
            const uid = this.getCurrentUserId();
            if (!uid) {
                throw new Error('User not authenticated');
            }

            const result = await window.FirebaseService.registerCreator(uid, creatorData);
            
            if (result.success) {
                // Update local state
                this.creatorsData.userCreator = result.data;
                this.creatorsData.creators.unshift(result.data);
                
                // Update UI
                this.updateCreatorsUI();
                
                // Dispatch event
                window.dispatchEvent(new CustomEvent('creatorRegistered', {
                    detail: { creator: result.data }
                }));
                
                console.log('✅ Creator registered successfully:', result.data);
                return { success: true, data: result.data };
            } else {
                console.error('❌ Failed to register creator:', result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('❌ Error registering creator:', error);
            return { success: false, error: error.message };
        }
    },

    // Update creator profile
    async updateCreatorProfile(updateData) {
        try {
            // Validate input
            if (!this.creatorsData.userCreator) {
                throw new Error('No creator profile found');
            }

            const uid = this.getCurrentUserId();
            if (!uid) {
                throw new Error('User not authenticated');
            }

            const result = await window.FirebaseService.updateCreatorProfile(uid, updateData);
            
            if (result.success) {
                // Update local state
                this.creatorsData.userCreator = result.data;
                
                // Update in creators list
                const index = this.creatorsData.creators.findIndex(c => c.uid === uid);
                if (index !== -1) {
                    this.creatorsData.creators[index] = result.data;
                }
                
                // Update UI
                this.updateCreatorsUI();
                
                // Dispatch event
                window.dispatchEvent(new CustomEvent('creatorProfileUpdated', {
                    detail: { creator: result.data }
                }));
                
                console.log('✅ Creator profile updated successfully');
                return { success: true, data: result.data };
            } else {
                console.error('❌ Failed to update creator profile:', result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('❌ Error updating creator profile:', error);
            return { success: false, error: error.message };
        }
    },

    // Follow/Unfollow creator
    async toggleFollow(creatorUid) {
        try {
            const followerUid = this.getCurrentUserId();
            if (!followerUid) {
                throw new Error('User not authenticated');
            }

            if (followerUid === creatorUid) {
                throw new Error('Cannot follow yourself');
            }

            const result = await window.FirebaseService.toggleCreatorFollow(followerUid, creatorUid);
            
            if (result.success) {
                // Update local state
                const creator = this.creatorsData.creators.find(c => c.uid === creatorUid);
                if (creator) {
                    if (result.data.following) {
                        creator.followers = (creator.followers || 0) + 1;
                    } else {
                        creator.followers = Math.max(0, (creator.followers || 0) - 1);
                    }
                }
                
                // Update UI
                this.updateCreatorsUI();
                
                console.log(`✅ ${result.data.following ? 'Followed' : 'Unfollowed'} creator successfully`);
                return { success: true, data: result.data };
            } else {
                console.error('❌ Failed to toggle follow:', result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('❌ Error toggling follow:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user ID
    getCurrentUserId() {
        return localStorage.getItem('currentUserId') || 'demo_user_123';
    },

    // Update creators UI
    updateCreatorsUI() {
        try {
            // Show loading state if needed
            if (this.creatorsData.loading) {
                this.showLoadingState();
                return;
            }

            // Update creators list
            const creatorsContainer = document.querySelector('.creators-list');
            if (creatorsContainer) {
                this.renderCreators(creatorsContainer);
            }

            // Update user creator profile
            const userProfileContainer = document.querySelector('.user-creator-profile');
            if (userProfileContainer) {
                this.renderUserProfile(userProfileContainer);
            }

            // Update top players section
            const topPlayersContainer = document.querySelector('.top-players');
            if (topPlayersContainer) {
                this.renderTopPlayers(topPlayersContainer);
            }

            // Update statistics
            this.updateCreatorsStats();

            // Show error state if needed
            if (this.creatorsData.error) {
                this.showErrorState();
            }
        } catch (error) {
            console.error('❌ Error updating creators UI:', error);
        }
    },

    // Show loading state
    showLoadingState() {
        const containers = [
            document.querySelector('.creators-list'),
            document.querySelector('.user-creator-profile'),
            document.querySelector('.top-players')
        ];

        containers.forEach(container => {
            if (container) {
                container.innerHTML = `
                    <div class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mt-3 text-muted">Loading creators data...</p>
                    </div>
                `;
            }
        });
    },

    // Show error state
    showErrorState() {
        const containers = [
            document.querySelector('.creators-list'),
            document.querySelector('.user-creator-profile'),
            document.querySelector('.top-players')
        ];

        containers.forEach(container => {
            if (container) {
                container.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h5 class="text-warning">Error Loading Data</h5>
                        <p class="text-muted">${this.creatorsData.error}</p>
                        <button class="btn btn-primary btn-sm" onclick="CreatorsIntegration.loadCreatorsData()">
                            Retry
                        </button>
                    </div>
                `;
            }
        });
    },

    // Render creators list
    renderCreators(container) {
        if (!container) return;

        const creators = this.creatorsData.creators;
        
        if (creators.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-palette fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">Chưa có Creator nào</h5>
                    <p class="text-muted">Hãy là người đầu tiên đăng ký làm Creator!</p>
                    <button class="btn btn-primary btn-sm" onclick="CreatorsIntegration.showRegisterModal()">
                        Đăng ký làm Creator
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = creators.map(creator => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body text-center">
                        <img src="${creator.avatar || 'images/default-avatar.jpg'}" class="rounded-circle mb-3" alt="${this.escapeHtml(creator.name)}" style="width: 80px; height: 80px; object-fit: cover;" onerror="this.src='images/default-avatar.jpg'">
                        <h6 class="card-title">${this.escapeHtml(creator.name)}</h6>
                        <p class="card-text text-muted small">${this.escapeHtml(creator.bio.substring(0, 100))}${creator.bio.length > 100 ? '...' : ''}</p>
                        <div class="d-flex justify-content-center gap-2 mb-3">
                            ${creator.categories.map(cat => `<span class="badge bg-secondary">${this.escapeHtml(cat)}</span>`).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-users me-1"></i>${creator.followers || 0} followers
                            </small>
                            <button class="btn btn-sm btn-outline-primary" onclick="CreatorsIntegration.viewCreator('${creator.uid}')">
                                Xem Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Render top players section
    renderTopPlayers(container) {
        if (!container) return;

        const topPlayers = this.creatorsData.topPlayers;
        const currentMonth = new Date().toLocaleString('vi-VN', { month: 'long', year: 'numeric' });
        
        if (topPlayers.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-trophy fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">Top Players - ${currentMonth}</h5>
                    <p class="text-muted">Chưa có dữ liệu người chơi top trong tháng này</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="mb-4">
                <h4 class="text-center mb-3">
                    <i class="fas fa-trophy text-warning me-2"></i>
                    Top Players - ${currentMonth}
                </h4>
                <div class="row">
                    ${topPlayers.map((player, index) => `
                        <div class="col-md-4 mb-3">
                            <div class="card ${index === 0 ? 'border-warning' : ''}">
                                <div class="card-body text-center">
                                    <div class="position-relative mb-3">
                                        <img src="${player.avatar || 'images/default-avatar.jpg'}" class="rounded-circle" alt="${this.escapeHtml(player.name)}" style="width: 60px; height: 60px; object-fit: cover;" onerror="this.src='images/default-avatar.jpg'">
                                        ${index < 3 ? `
                                            <div class="position-absolute top-0 start-50 translate-middle-x">
                                                <span class="badge bg-${index === 0 ? 'warning' : index === 1 ? 'secondary' : 'danger'} rounded-circle" style="width: 24px; height: 24px; line-height: 24px; font-size: 12px;">
                                                    ${index + 1}
                                                </span>
                                            </div>
                                        ` : ''}
                                    </div>
                                    <h6 class="card-title mb-1">${this.escapeHtml(player.name)}</h6>
                                    <div class="row text-center small">
                                        <div class="col-6">
                                            <div class="text-primary fw-bold">${player.score.toLocaleString()}</div>
                                            <div class="text-muted">Score</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-success fw-bold">${player.hitRate}%</div>
                                            <div class="text-muted">Hit Rate</div>
                                        </div>
                                    </div>
                                    <div class="row text-center small mt-2">
                                        <div class="col-6">
                                            <div class="text-info fw-bold">${player.gamesPlayed}</div>
                                            <div class="text-muted">Games</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-warning fw-bold">${player.ppoEarned}</div>
                                            <div class="text-muted">PPO</div>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <span class="badge bg-primary">${player.nftsCollected} NFTs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // Render user creator profile
    renderUserProfile(container) {
        if (!container) return;

        const userCreator = this.creatorsData.userCreator;
        
        if (!userCreator) {
            container.innerHTML = `
                <div class="text-center py-3">
                    <p class="text-muted">Bạn chưa đăng ký làm Creator.</p>
                    <button class="btn btn-primary btn-sm" onclick="CreatorsIntegration.showRegisterModal()">
                        Đăng ký làm Creator
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <img src="${userCreator.avatar || 'images/default-avatar.jpg'}" class="rounded-circle mb-3" alt="${this.escapeHtml(userCreator.name)}" style="width: 100px; height: 100px; object-fit: cover;" onerror="this.src='images/default-avatar.jpg'">
                    <h5 class="card-title">${this.escapeHtml(userCreator.name)}</h5>
                    <p class="card-text text-muted">${this.escapeHtml(userCreator.bio)}</p>
                    <div class="d-flex justify-content-center gap-2 mb-3">
                        ${userCreator.categories.map(cat => `<span class="badge bg-primary">${this.escapeHtml(cat)}</span>`).join('')}
                    </div>
                    <div class="row text-center mb-3">
                        <div class="col-4">
                            <h6>${userCreator.followers || 0}</h6>
                            <small class="text-muted">Followers</small>
                        </div>
                        <div class="col-4">
                            <h6>${userCreator.totalViews || 0}</h6>
                            <small class="text-muted">Views</small>
                        </div>
                        <div class="col-4">
                            <h6>${userCreator.totalLikes || 0}</h6>
                            <small class="text-muted">Likes</small>
                        </div>
                    </div>
                    <button class="btn btn-outline-primary btn-sm" onclick="CreatorsIntegration.showEditProfileModal()">
                        Chỉnh sửa Profile
                    </button>
                </div>
            </div>
        `;
    },

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Update creators statistics
    updateCreatorsStats() {
        const totalCreators = this.creatorsData.creators.length;
        const totalFollowers = this.creatorsData.creators.reduce((sum, creator) => sum + (creator.followers || 0), 0);
        const topPlayersCount = this.creatorsData.topPlayers.length;
        
        // Update stats elements if they exist
        const totalElement = document.getElementById('total-creators');
        if (totalElement) totalElement.textContent = totalCreators;
        
        const followersElement = document.getElementById('total-followers');
        if (followersElement) followersElement.textContent = totalFollowers;

        const topPlayersElement = document.getElementById('top-players-count');
        if (topPlayersElement) topPlayersElement.textContent = topPlayersCount;
    },

    // Show register creator modal
    showRegisterModal() {
        try {
            const modal = `
                <div class="modal fade" id="registerCreatorModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Đăng ký làm Creator</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="registerCreatorForm">
                                    <div class="mb-3">
                                        <label class="form-label">Tên Creator *</label>
                                        <input type="text" class="form-control" name="name" required maxlength="100">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Giới thiệu *</label>
                                        <textarea class="form-control" name="bio" rows="3" required maxlength="500" placeholder="Giới thiệu về bản thân và công việc của bạn..."></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Danh mục</label>
                                        <div class="row">
                                            ${this.creatorsData.categories.map(cat => `
                                                <div class="col-6">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="categories" value="${cat}" id="cat_${cat}">
                                                        <label class="form-check-label" for="cat_${cat}">${cat}</label>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Avatar URL (tùy chọn)</label>
                                        <input type="url" class="form-control" name="avatar" placeholder="https://example.com/avatar.jpg">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Liên kết mạng xã hội (tùy chọn)</label>
                                        <input type="url" class="form-control mb-2" name="socialLinks[twitter]" placeholder="Twitter URL">
                                        <input type="url" class="form-control mb-2" name="socialLinks[instagram]" placeholder="Instagram URL">
                                        <input type="url" class="form-control" name="socialLinks[youtube]" placeholder="YouTube URL">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" class="btn btn-primary" onclick="CreatorsIntegration.submitRegisterForm()" id="submitRegisterBtn">
                                    Đăng ký làm Creator
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Remove existing modal if any
            const existingModal = document.getElementById('registerCreatorModal');
            if (existingModal) existingModal.remove();

            // Add new modal
            document.body.insertAdjacentHTML('beforeend', modal);
            
            // Show modal
            const modalElement = document.getElementById('registerCreatorModal');
            const bootstrapModal = new bootstrap.Modal(modalElement);
            bootstrapModal.show();
        } catch (error) {
            console.error('❌ Error showing register modal:', error);
            this.showNotification('Failed to open registration form', 'error');
        }
    },

    // Submit register form
    async submitRegisterForm() {
        try {
            const form = document.getElementById('registerCreatorForm');
            const submitBtn = document.getElementById('submitRegisterBtn');
            
            if (!form) {
                throw new Error('Form not found');
            }

            // Disable submit button to prevent double submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang đăng ký...';
            }

            const formData = new FormData(form);
            
            // Validate form data
            const name = formData.get('name')?.trim();
            const bio = formData.get('bio')?.trim();
            const avatar = formData.get('avatar')?.trim();
            const categories = formData.getAll('categories');

            if (!name || !bio) {
                throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
            }

            if (name.length > 100) {
                throw new Error('Tên không được quá 100 ký tự');
            }

            if (bio.length > 500) {
                throw new Error('Giới thiệu không được quá 500 ký tự');
            }

            // Build social links object
            const socialLinks = {};
            const socialFields = ['twitter', 'instagram', 'youtube'];
            socialFields.forEach(field => {
                const url = formData.get(`socialLinks[${field}]`)?.trim();
                if (url) socialLinks[field] = url;
            });

            const creatorData = {
                name: name,
                bio: bio,
                categories: categories,
                avatar: avatar || '',
                socialLinks: socialLinks
            };

            const result = await this.registerCreator(creatorData);
            
            if (result.success) {
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('registerCreatorModal'));
                if (modal) modal.hide();
                
                // Show success message
                this.showNotification('Đăng ký Creator thành công!', 'success');
            } else {
                this.showNotification(`Lỗi: ${result.error}`, 'error');
            }
        } catch (error) {
            console.error('❌ Error submitting register form:', error);
            this.showNotification(`Lỗi: ${error.message}`, 'error');
        } finally {
            // Re-enable submit button
            const submitBtn = document.getElementById('submitRegisterBtn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Đăng ký làm Creator';
            }
        }
    },

    // Show edit profile modal
    showEditProfileModal() {
        try {
            const userCreator = this.creatorsData.userCreator;
            if (!userCreator) {
                this.showNotification('Không tìm thấy profile Creator', 'error');
                return;
            }

            const modal = `
                <div class="modal fade" id="editProfileModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Chỉnh sửa Creator Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="editProfileForm">
                                    <div class="mb-3">
                                        <label class="form-label">Tên Creator *</label>
                                        <input type="text" class="form-control" name="name" value="${this.escapeHtml(userCreator.name)}" required maxlength="100">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Giới thiệu *</label>
                                        <textarea class="form-control" name="bio" rows="3" required maxlength="500">${this.escapeHtml(userCreator.bio)}</textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Danh mục</label>
                                        <div class="row">
                                            ${this.creatorsData.categories.map(cat => `
                                                <div class="col-6">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="categories" value="${cat}" id="edit_cat_${cat}" ${userCreator.categories.includes(cat) ? 'checked' : ''}>
                                                        <label class="form-check-label" for="edit_cat_${cat}">${cat}</label>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Avatar URL</label>
                                        <input type="url" class="form-control" name="avatar" value="${this.escapeHtml(userCreator.avatar || '')}" placeholder="https://example.com/avatar.jpg">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" class="btn btn-primary" onclick="CreatorsIntegration.submitEditForm()" id="submitEditBtn">
                                    Cập nhật Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Remove existing modal if any
            const existingModal = document.getElementById('editProfileModal');
            if (existingModal) existingModal.remove();

            // Add new modal
            document.body.insertAdjacentHTML('beforeend', modal);
            
            // Show modal
            const modalElement = document.getElementById('editProfileModal');
            const bootstrapModal = new bootstrap.Modal(modalElement);
            bootstrapModal.show();
        } catch (error) {
            console.error('❌ Error showing edit profile modal:', error);
            this.showNotification('Failed to open edit profile form', 'error');
        }
    },

    // Submit edit form
    async submitEditForm() {
        try {
            const form = document.getElementById('editProfileForm');
            const submitBtn = document.getElementById('submitEditBtn');
            
            if (!form) {
                throw new Error('Form not found');
            }

            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang cập nhật...';
            }

            const formData = new FormData(form);
            
            // Validate form data
            const name = formData.get('name')?.trim();
            const bio = formData.get('bio')?.trim();
            const avatar = formData.get('avatar')?.trim();
            const categories = formData.getAll('categories');

            if (!name || !bio) {
                throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
            }

            if (name.length > 100) {
                throw new Error('Tên không được quá 100 ký tự');
            }

            if (bio.length > 500) {
                throw new Error('Giới thiệu không được quá 500 ký tự');
            }

            const updateData = {
                name: name,
                bio: bio,
                categories: categories,
                avatar: avatar || ''
            };

            const result = await this.updateCreatorProfile(updateData);
            
            if (result.success) {
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
                if (modal) modal.hide();
                
                // Show success message
                this.showNotification('Cập nhật Profile thành công!', 'success');
            } else {
                this.showNotification(`Lỗi: ${result.error}`, 'error');
            }
        } catch (error) {
            console.error('❌ Error submitting edit form:', error);
            this.showNotification(`Lỗi: ${error.message}`, 'error');
        } finally {
            // Re-enable submit button
            const submitBtn = document.getElementById('submitEditBtn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Cập nhật Profile';
            }
        }
    },

    // View creator profile
    viewCreator(creatorUid) {
        try {
            const creator = this.creatorsData.creators.find(c => c.uid === creatorUid);
            if (!creator) {
                this.showNotification('Không tìm thấy Creator', 'error');
                return;
            }

            // Show creator profile modal
            const modal = `
                <div class="modal fade" id="viewCreatorModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${this.escapeHtml(creator.name)}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4 text-center">
                                        <img src="${creator.avatar || 'images/default-avatar.jpg'}" class="rounded-circle mb-3" alt="${this.escapeHtml(creator.name)}" style="width: 120px; height: 120px; object-fit: cover;" onerror="this.src='images/default-avatar.jpg'">
                                        <button class="btn btn-primary w-100" onclick="CreatorsIntegration.toggleFollow('${creator.uid}')">
                                            Follow
                                        </button>
                                    </div>
                                    <div class="col-md-8">
                                        <h6>Giới thiệu</h6>
                                        <p>${this.escapeHtml(creator.bio)}</p>
                                        <div class="mb-3">
                                            ${creator.categories.map(cat => `<span class="badge bg-primary me-1">${this.escapeHtml(cat)}</span>`).join('')}
                                        </div>
                                        <div class="row text-center">
                                            <div class="col-4">
                                                <h6>${creator.followers || 0}</h6>
                                                <small class="text-muted">Followers</small>
                                            </div>
                                            <div class="col-4">
                                                <h6>${creator.totalViews || 0}</h6>
                                                <small class="text-muted">Views</small>
                                            </div>
                                            <div class="col-4">
                                                <h6>${creator.totalLikes || 0}</h6>
                                                <small class="text-muted">Likes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Remove existing modal if any
            const existingModal = document.getElementById('viewCreatorModal');
            if (existingModal) existingModal.remove();

            // Add new modal
            document.body.insertAdjacentHTML('beforeend', modal);
            
            // Show modal
            const modalElement = document.getElementById('viewCreatorModal');
            const bootstrapModal = new bootstrap.Modal(modalElement);
            bootstrapModal.show();
        } catch (error) {
            console.error('❌ Error viewing creator:', error);
            this.showNotification('Failed to view creator profile', 'error');
        }
    },

    // Show notification
    showNotification(message, type = 'info') {
        try {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.creators-notification');
            existingNotifications.forEach(notification => notification.remove());

            // Create notification element
            const notification = document.createElement('div');
            notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed creators-notification`;
            notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
            notification.innerHTML = `
                ${this.escapeHtml(message)}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

            document.body.appendChild(notification);

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
        } catch (error) {
            console.error('❌ Error showing notification:', error);
        }
    },

    // Start periodic updates
    startPeriodicUpdates() {
        // Clear existing interval if any
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Update every 30 seconds
        this.updateInterval = setInterval(() => {
            if (this.creatorsData.initialized) {
                this.loadCreatorsData();
            }
        }, 30000);
    },

    // Stop periodic updates
    stopPeriodicUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    },

    // Setup event listeners
    setupEventListeners() {
        try {
            // Listen for custom events
            window.addEventListener('creatorRegistered', (event) => {
                console.log('🎉 New creator registered:', event.detail);
            });

            window.addEventListener('creatorProfileUpdated', (event) => {
                console.log('📝 Creator profile updated:', event.detail);
            });

            // Listen for page visibility changes
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible' && this.creatorsData.initialized) {
                    this.loadCreatorsData();
                }
            });
        } catch (error) {
            console.error('❌ Error setting up event listeners:', error);
        }
    },

    // Cleanup function
    cleanup() {
        this.stopPeriodicUpdates();
        console.log('🧹 Creators Integration cleaned up');
    },


};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    CreatorsIntegration.init();
});

// Cleanup when page unloads
window.addEventListener('beforeunload', () => {
    CreatorsIntegration.cleanup();
});

// Export for global access
window.CreatorsIntegration = CreatorsIntegration;

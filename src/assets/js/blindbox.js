// BlindBox page script
(function() {
  function getCurrentUser() {
    const userUid = localStorage.getItem('userUid');
    const walletAddress = localStorage.getItem('walletAddress');
    if (userUid) return { uid: userUid };
    if (walletAddress) return { uid: `wallet_${walletAddress.toLowerCase()}` };
    return null;
  }

  function showToast(msg, isError) {
    const el = document.createElement('div');
    el.className = `alert alert-${isError ? 'danger' : 'success'} position-fixed`;
    el.style.cssText = 'top:20px; right:20px; z-index:9999;';
    el.innerHTML = `<i class="fas fa-${isError ? 'exclamation-triangle' : 'check-circle'} me-2"></i>${msg}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  async function openBlindbox() {
    const user = getCurrentUser();
    if (!user) {
      showToast('Please sign in or connect wallet first', true);
      return;
    }
    try {
      const result = await window.FirebaseService.openBlindbox(user.uid, {});
      if (!result.success) {
        showToast(result.error || 'Failed to open BlindBox', true);
        return;
      }
      const { reward } = result.data;
      // Update UI
      const resultWrap = document.getElementById('blindboxResult');
      const nftImage = document.getElementById('nftImage');
      const nftName = document.getElementById('nftName');
      const nftRarity = document.getElementById('nftRarity');
      nftImage.src = reward.image;
      nftName.textContent = reward.name;
      nftRarity.textContent = reward.rarity;
      nftRarity.className = 'badge ' + (reward.rarity.includes('SSS') ? 'bg-warning text-dark' : reward.rarity.includes('★★★★★') ? 'bg-success' : reward.rarity.includes('★★★') ? 'bg-primary' : 'bg-secondary');
      resultWrap.classList.remove('d-none');
      showToast('BlindBox opened successfully!');
    } catch (e) {
      console.error(e);
      showToast('Error opening BlindBox', true);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('openBlindboxBtn');
    if (btn) btn.addEventListener('click', openBlindbox);
  });
})();



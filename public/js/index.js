// public/js/index.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('listing-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1️⃣ Run browser validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 2️⃣ Collect & submit
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('✅ Listing created!');
        window.location.href = '/listings.html';
      } else {
        const err = await res.json();
        alert('❌ ' + (err.error || 'Could not create listing.'));
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network error. Please try again.');
    }
  });
});

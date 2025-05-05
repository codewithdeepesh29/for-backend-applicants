// public/js/listings.js
async function loadListings() {
  try {
    const res = await fetch('/api/listings');
    if (!res.ok) throw new Error('Failed to fetch listings');
    const listings = await res.json();
    const ul = document.getElementById('listings');
    ul.innerHTML = ''; // clear any placeholder

    listings.forEach(l => {
      const rentNum  = parseFloat(l.rent);
      const roomsNum = parseInt(l.rooms, 10);

      // create list item
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${l.title} — $${rentNum.toFixed(2)}</h3>
        <p><strong>Rooms:</strong> ${roomsNum}</p>
        <p><strong>Address:</strong> ${l.address}</p>
        <p><strong>Contact:</strong> ${l.contact_info}</p>
        <p>${l.description}</p>
      `;

      // create Delete button
      const btn = document.createElement('button');
      btn.textContent = 'Delete';
      btn.style.marginTop = '0.5rem';
      btn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to delete this listing?')) return;
        const delRes = await fetch(`/api/listings/${l.id}`, { method: 'DELETE' });
        if (delRes.ok) {
          ul.removeChild(li);
        } else {
          const err = await delRes.json();
          alert('Error deleting listing: ' + (err.error || delRes.status));
        }
      });

      li.appendChild(btn);
      ul.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    document.getElementById('listings').innerHTML =
      '<li>Error loading listings.</li>';
  }
}

document.addEventListener('DOMContentLoaded', loadListings);

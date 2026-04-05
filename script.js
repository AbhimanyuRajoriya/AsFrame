// ===================================
// GALLERY DATA - EDIT YOUR IMAGES HERE
// ===================================

const galleryImages = [
    {
        src: "images/1000090796 (1) (1).png",
        title: "Chase"
    },
    {
        src: "images/IMG_20250426_060824.jpg",
        title: "Natural Light"
    },
    {
        src: "images/IMG20250618183746 (1).jpg",
        title: "Main Character"
    },
    {
        src: "images/IMG20240721083113.jpg",
        title: "Tulsi"
    },
    {
        src: "images/IMG20250618183810.jpg",
        title: "Character Study"
    },
    {
        src: "images/IMG20250907095540.jpg",
        title: "History"
    },
    {
        src: "images/IMG20250907095637.jpg",
        title: "Mountain View"
    },
    {
        src: "images/IMG20250907103032.jpg",
        title: "Heritage"
    },
    {
        src: "images/IMG20251230175805.jpg",
        title: "Color Palette"
    },
    {
        src: "images/IMG20260123210142 (3).jpg",
        title: "Time"
    },
    {
        src: "images/IMG20260126172537.jpg",
        title: "Sea of Forever"
    },
    {
        src: "images/IMG20260126172556.jpg",
        title: "Waves"
    },
    {
        src: "images/IMG20231114153512.jpg",
        title: "Bloom"
    },
    {
        src: "images/IMG20260322151216.jpg",
        title: "Little Paws"
    }
    ,
    {
        src: "images/IMG20260404184526 (1).jpg",
        title: "Limits and Linger"
    },
    {
        src: "images/IMG20260327063651.jpg",
        title: "Wake Up"
    }
];

// ===================================
// GALLERY RENDERING
// ===================================

const galleryGrid = document.getElementById('galleryGrid');
let currentImageIndex = 0;

// Create gallery items
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = image.category;
        item.dataset.index = index;
        
        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <h3 class="gallery-item-title">${image.title}</h3>
            </div>
        `;
        
        // Click event to open modal
        item.addEventListener('click', () => openModal(index));
        
        galleryGrid.appendChild(item);
    });
}

// ===================================
// CATEGORY FILTERING
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get selected category
        const filter = button.dataset.filter;
        
        // Filter gallery items
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                // Stagger animation
                setTimeout(() => {
                    item.style.animation = 'fadeIn 0.5s ease';
                }, Math.random() * 200);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===================================
// IMAGE MODAL (POPUP)
// ===================================

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const downloadImage = document.getElementById('downloadImage');
 
// Open modal
function openModal(index) {
    currentImageIndex = index;
    updateModalContent();
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}
 
// Close modal
function closeModalFunc() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
}
 
// Update modal content
function updateModalContent() {
    const image = galleryImages[currentImageIndex];
    modalImage.src = image.src;
    modalImage.alt = image.title;
    modalTitle.textContent = image.title;
}
 
// Navigate to previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalContent();
}
 
// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModalContent();
}
 
// Download current image
function downloadCurrentImage() {
    const image = galleryImages[currentImageIndex];
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
 
// Event listeners
closeModal.addEventListener('click', closeModalFunc);
prevImage.addEventListener('click', showPrevImage);
nextImage.addEventListener('click', showNextImage);
downloadImage.addEventListener('click', downloadCurrentImage);
 
// Close modal on backdrop click
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModalFunc();
    }
});
 
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModalFunc();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});
 
// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
 
// ===================================
// INITIALIZE
// ===================================
 
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    
    // Add scroll reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    document.querySelectorAll('.gallery-section, .about-section, .contact-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});
 
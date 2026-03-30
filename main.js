// Real-time text updates
document.getElementById('headlineInput').addEventListener('input', (e) => {
    document.getElementById('previewHeadline').textContent = e.target.value;
});

document.getElementById('bodyInput').addEventListener('input', (e) => {
    const text = e.target.value;
    // Simple logic to highlight text between quotes or specific keywords
    const highlighted = text.replace(/"([^"]*)"/g, '"<span class="text-yellow-400 font-semibold">$1</span>"')
        .replace(/\*([^*]*)\*/g, '<span class="text-yellow-400 font-semibold">$1</span>');
    document.getElementById('previewBody').innerHTML = highlighted;
});

document.getElementById('brandName').addEventListener('input', (e) => {
    document.getElementById('previewBrand').textContent = e.target.value;
});

document.getElementById('ctaInput').addEventListener('input', (e) => {
    document.getElementById('previewCTAText').textContent = e.target.value;
});

document.getElementById('websiteInput').addEventListener('input', (e) => {
    document.getElementById('previewWebsite').textContent = e.target.value;
});

// Image handling
window.handleImageUpload = function(input, type) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updateImagePreview(type, e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function updateImagePreview(type, src) {
    if (type === 'hero') {
        document.getElementById('previewHero').src = src;
        document.getElementById('heroImg').src = src;
        document.getElementById('heroPreview').classList.remove('hidden');
        document.getElementById('heroPlaceholder').classList.add('hidden');
    } else if (type === 'logo') {
        document.getElementById('previewLogo').src = src;
        document.getElementById('logoImg').src = src;
        document.getElementById('logoPreview').classList.remove('hidden');
        document.getElementById('logoPlaceholder').classList.add('hidden');
    } else if (type === 'product') {
        document.getElementById('previewProduct').src = src;
        document.getElementById('productImg').src = src;
        document.getElementById('productPreview').classList.remove('hidden');
        document.getElementById('productPlaceholder').classList.add('hidden');
    }
}

window.removeImage = function(type) {
    if (type === 'hero') {
        document.getElementById('previewHero').src = 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80';
        document.getElementById('heroPreview').classList.add('hidden');
        document.getElementById('heroPlaceholder').classList.remove('hidden');
        document.getElementById('heroUpload').value = '';
    } else if (type === 'product') {
        document.getElementById('previewProduct').src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80';
        document.getElementById('productPreview').classList.add('hidden');
        document.getElementById('productPlaceholder').classList.remove('hidden');
        document.getElementById('productUpload').value = '';
    }
}

// Drag and drop
window.dragOverHandler = function(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

window.dragLeaveHandler = function(e) {
    e.currentTarget.classList.remove('dragover');
}

window.dropHandler = function(e, type) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
            updateImagePreview(type, event.target.result);
        };
        reader.readAsDataURL(files[0]);
    }
}

// Formatting
window.formatText = function(type) {
    const input = document.getElementById('headlineInput');
    if (type === 'uppercase') {
        input.value = input.value.toUpperCase();
    } else if (type === 'titlecase') {
        input.value = input.value.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }
    document.getElementById('previewHeadline').textContent = input.value;
}

// Color updates
window.updateHighlightColor = function(color) {
    document.getElementById('previewHighlight').style.color = color;
}

window.updateCTAColor = function(color) {
    const btn = document.getElementById('previewCTA');
    btn.style.backgroundColor = color;
    btn.className = btn.className.replace(/bg-\w+-500/, '').replace(/hover:bg-\w+-600/, '');
    btn.style.backgroundColor = color;
}

window.updateCTATextColor = function(color) {
    document.getElementById('previewCTA').style.color = color;
}

// Template switching
window.changeTemplate = function(style) {
    const container = document.getElementById('adContainer');
    const headline = document.getElementById('previewHeadline');

    if (style === 'dark') {
        container.style.backgroundColor = '#0B2A3A';
        headline.style.color = 'white';
    } else if (style === 'green') {
        container.style.backgroundColor = '#064e3b';
        headline.style.color = '#ecfdf5';
    } else if (style === 'purple') {
        container.style.backgroundColor = '#581c87';
        headline.style.color = '#faf5ff';
    }
}

// Reset
window.resetTemplate = function() {
    document.getElementById('headlineInput').value = "THE 'OGA' OF THE HOUSE CANNOT AFFORD TO BREAK DOWN.";
    document.getElementById('bodyInput').value = "Your family relies on your strength. Natural Heart Care gives you the internal engine overhaul you need to stay active, productive, and in charge for them.";
    document.getElementById('brandName').value = "NATURAL HEART CARE";
    document.getElementById('ctaInput').value = "START YOUR HEART CARE JOURNEY";
    document.getElementById('websiteInput').value = "naturalheartcare.com.ng";

    // Trigger updates
    document.getElementById('headlineInput').dispatchEvent(new Event('input'));
    document.getElementById('bodyInput').dispatchEvent(new Event('input'));
    document.getElementById('brandName').dispatchEvent(new Event('input'));
    document.getElementById('ctaInput').dispatchEvent(new Event('input'));
    document.getElementById('websiteInput').dispatchEvent(new Event('input'));

    removeImage('hero');
    removeImage('product');
    document.getElementById('logoPreview').classList.add('hidden');
    document.getElementById('logoPlaceholder').classList.remove('hidden');
    document.getElementById('previewLogo').src = 'https://cdn-icons-png.flaticon.com/512/833/833472.png';

    changeTemplate('dark');
}

import domtoimage from 'dom-to-image';

// Download functionality
window.downloadImage = function() {
    const btn = document.querySelector('button[onclick="downloadImage()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';

    const node = document.getElementById('adContainer');
    // Ensure accurate scaling by resetting any transforms
    const originalTransform = node.style.transform;
    node.style.transform = 'none';

    /* To prevent the CTA from getting cut off during scaled export, we explicitly set the styled width and height equal to the visible node client width, and scale up via `transform`. */
    const scaleFactor = 3;
    domtoimage.toPng(node, {
        quality: 1,
        width: node.clientWidth * scaleFactor,
        height: node.clientHeight * scaleFactor,
        style: {
            transform: 'scale(' + scaleFactor + ')',
            transformOrigin: 'top left',
            width: node.clientWidth + 'px',
            height: node.clientHeight + 'px',
            margin: 0
        }
    })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'marketing-asset.png';
        link.href = dataUrl;
        link.click();
        btn.innerHTML = originalText;
        node.style.transform = originalTransform;
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
        alert('Failed to generate image. See console for details.');
        btn.innerHTML = originalText;
        node.style.transform = originalTransform;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load from localStorage
    const savedData = JSON.parse(localStorage.getItem('adTemplateData') || '{}');
    if (savedData.headline) document.getElementById('headlineInput').value = savedData.headline;
    if (savedData.body) document.getElementById('bodyInput').value = savedData.body;
    if (savedData.brand) document.getElementById('brandName').value = savedData.brand;
    if (savedData.cta) document.getElementById('ctaInput').value = savedData.cta;
    if (savedData.website) document.getElementById('websiteInput').value = savedData.website;
    if (savedData.highlightColor) {
        document.getElementById('highlightColor').value = savedData.highlightColor;
        updateHighlightColor(savedData.highlightColor);
    }
    if (savedData.ctaColor) {
        document.getElementById('ctaColor').value = savedData.ctaColor;
        updateCTAColor(savedData.ctaColor);
    }
    if (savedData.ctaTextColor) {
        document.getElementById('ctaTextColor').value = savedData.ctaTextColor;
        updateCTATextColor(savedData.ctaTextColor);
    }

    // Trigger initial updates
    document.getElementById('headlineInput').dispatchEvent(new Event('input'));
    document.getElementById('bodyInput').dispatchEvent(new Event('input'));
    document.getElementById('brandName').dispatchEvent(new Event('input'));
    document.getElementById('ctaInput').dispatchEvent(new Event('input'));
    document.getElementById('websiteInput').dispatchEvent(new Event('input'));

    // Save to localStorage helper
    const saveData = () => {
        const data = {
            headline: document.getElementById('headlineInput').value,
            body: document.getElementById('bodyInput').value,
            brand: document.getElementById('brandName').value,
            cta: document.getElementById('ctaInput').value,
            website: document.getElementById('websiteInput').value,
            highlightColor: document.getElementById('highlightColor').value,
            ctaColor: document.getElementById('ctaColor').value,
            ctaTextColor: document.getElementById('ctaTextColor').value,
        };
        localStorage.setItem('adTemplateData', JSON.stringify(data));
    };

    // Attach save to inputs
    ['headlineInput', 'bodyInput', 'brandName', 'ctaInput', 'websiteInput', 'highlightColor', 'ctaColor', 'ctaTextColor'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', saveData);
        document.getElementById(id)?.addEventListener('change', saveData);
    });

    // Add subtle parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX) / 50;
        const y = (window.innerHeight - e.pageY) / 50;
        const container = document.getElementById('adContainer');
        if (container) {
            container.style.transform = `perspective(1000px) rotateY(${x * 0.05}deg) rotateX(${y * 0.05}deg)`;
        }
    });

    // Make Product Image Draggable
    makeDraggable(document.getElementById("productLayer"), document.getElementById("productLayer")?.parentElement, 1);
    
    // Make Hero Image Draggable
    makeDraggable(document.getElementById("heroTransformContainer"), document.getElementById("heroTransformContainer")?.parentElement, 1.3);

    // Reusable drag function
    function makeDraggable(dragItem, container, scaleFactor = 1) {
        if (!dragItem || !container) return;
        
        let active = false;
        let currentX = 0;
        let currentY = 0;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        container.addEventListener("touchstart", dragStart, {passive: false});
        container.addEventListener("touchend", dragEnd, {passive: false});
        container.addEventListener("touchmove", drag, {passive: false});

        container.addEventListener("mousedown", dragStart, {passive: false});
        window.addEventListener("mouseup", dragEnd, {passive: false});
        window.addEventListener("mousemove", drag, {passive: false});

        function dragStart(e) {
            // Find if target is dragItem or inside dragItem
            if (e.target === dragItem || dragItem.contains(e.target)) {
                if (e.type === "touchstart") {
                    initialX = e.touches[0].clientX - xOffset;
                    initialY = e.touches[0].clientY - yOffset;
                } else {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;
                }
                active = true;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            active = false;
        }

        function drag(e) {
            if (active) {
                e.preventDefault(); // Prevent scrolling while dragging
            
                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                // If scale > 1 (e.g. Hero), calculate bounds to prevent dragging out of the visible scaled area
                let minX, maxX, minY, maxY;

                if (scaleFactor > 1) {
                    const extraWidth = dragItem.clientWidth * (scaleFactor - 1) / 2;
                    const extraHeight = dragItem.clientHeight * (scaleFactor - 1) / 2;
                    minX = -extraWidth;
                    maxX = extraWidth;
                    minY = -extraHeight;
                    maxY = extraHeight;
                } else {
                    // Standard contained bounds (e.g. for the Product layer)
                    maxX = container.clientWidth - dragItem.clientWidth;
                    minX = -dragItem.offsetLeft;
                    maxY = container.clientHeight - dragItem.clientHeight;
                    minY = -dragItem.offsetTop;
                }

                currentX = Math.min(Math.max(currentX, minX), maxX);
                currentY = Math.min(Math.max(currentY, minY), maxY);

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, dragItem, scaleFactor);
            }
        }

        function setTranslate(xPos, yPos, el, scale) {
            if (scale > 1) {
                el.style.transform = `scale(${scale}) translate3d(${xPos / scale}px, ${yPos / scale}px, 0)`;
            } else {
                el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            }
        }
    }
});

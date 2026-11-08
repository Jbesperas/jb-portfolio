
/* ========================================
   JB PORTFOLIO - MAIN JAVASCRIPT
======================================== */

// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMobileMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ========================================
// PDF PREVIEW
// ========================================

const pdfModal = document.getElementById("pdf-modal");
const pdfFrame = document.getElementById("pdf-frame");
const pdfTitle = document.getElementById("pdf-title");
const openPdfLink = document.getElementById("open-pdf");
const closePdfButton = document.getElementById("close-pdf");

// Keep this folder name exactly as it appears in GitHub.
// "azuuredocumentation" has two U's.
const azureDocsFolder = "assets/azuuredocumentation/";

// Open selected PDF in the preview window.
function openPdf(filePath, title) {
    if (!pdfModal || !pdfFrame || !pdfTitle || !openPdfLink) {
        window.open(filePath, "_blank", "noopener,noreferrer");
        return;
    }

    pdfTitle.textContent = title || "Document Preview";

    // Display PDF inside the dialog.
    pdfFrame.src = filePath;

    // Also provide a link to open the PDF in a new tab.
    openPdfLink.href = filePath;

    if (!pdfModal.open) {
        pdfModal.showModal();
    }
}

// Close the PDF preview.
function closePdf() {
    if (pdfModal && pdfModal.open) {
        pdfModal.close();
    }
}

// ========================================
// AZURE PRACTICAL DOCUMENTATION
// ========================================

document.querySelectorAll(".preview-btn").forEach(button => {
    button.addEventListener("click", () => {
        const filename = button.dataset.pdf;
        const title = button.dataset.title;

        if (!filename) return;

        // Encode special characters in filenames.
        // Works with spaces and symbols such as #.
        const filePath =
            azureDocsFolder + encodeURIComponent(filename);

        openPdf(filePath, title);
    });
});

// ========================================
// CERTIFICATE PREVIEW
// ========================================

document.querySelectorAll(".credential-preview").forEach(button => {
    button.addEventListener("click", () => {
        const filePath = button.dataset.file;
        const title = button.dataset.title;

        if (!filePath) return;

        openPdf(filePath, title);
    });
});

// ========================================
// PDF MODAL CONTROLS
// ========================================

// Close button.
if (closePdfButton) {
    closePdfButton.addEventListener("click", closePdf);
}

// Close when clicking outside the dialog content.
if (pdfModal) {
    pdfModal.addEventListener("click", event => {
        if (event.target === pdfModal) {
            closePdf();
        }
    });

    // Clear the PDF frame when the modal closes.
    pdfModal.addEventListener("close", () => {
        if (pdfFrame) {
            pdfFrame.removeAttribute("src");
        }
    });
}

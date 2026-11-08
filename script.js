
// ========================================
// JB PORTFOLIO - MAIN JAVASCRIPT
// ========================================

// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMobileMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
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


// ========================================
// PDF PREVIEW
// ========================================

const pdfModal = document.getElementById("pdf-modal");
const pdfFrame = document.getElementById("pdf-frame");
const pdfTitle = document.getElementById("pdf-title");
const openPdfLink = document.getElementById("open-pdf");
const closePdfButton = document.getElementById("close-pdf");

// Folder containing the six Practical PDFs
const azureDocsFolder = "assets/azuuredocumentation/";

function openPdf(filePath, title) {
    pdfTitle.textContent = title;

    // Load the PDF into the embedded viewer
    pdfFrame.src = filePath;

    // Allow opening the same PDF in a new tab
    openPdfLink.href = filePath;

    pdfModal.showModal();
}

function closePdf() {
    pdfModal.close();
}

// Practical documentation buttons
document.querySelectorAll(".preview-btn").forEach(button => {
    button.addEventListener("click", () => {
        const filename = button.dataset.pdf;
        const title = button.dataset.title;

        // Encode spaces and # so the PDF URL works
        const filePath = azureDocsFolder
            + encodeURIComponent(filename);

        openPdf(filePath, title);
    });
});

// Certificate preview buttons
document.querySelectorAll(".credential-preview").forEach(button => {
    button.addEventListener("click", () => {
        const filePath = button.dataset.file;
        const title = button.dataset.title;

        openPdf(filePath, title);
    });
});

// Close button
closePdfButton.addEventListener("click", closePdf);

// Close when clicking outside the dialog
pdfModal.addEventListener("click", event => {
    if (event.target === pdfModal) {
        closePdf();
    }
});

// Remove PDF from iframe after the dialog closes
pdfModal.addEventListener("close", () => {
    pdfFrame.removeAttribute("src");
});

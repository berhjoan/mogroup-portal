document.addEventListener('DOMContentLoaded', function() {
    const clientCards = document.querySelectorAll('.client-card');
    const modal = document.getElementById('accessModal');
    const closeModal = document.querySelector('.close-modal');
    const modalClientLogo = document.getElementById('modalClientLogo');
    const modalClientName = document.getElementById('modalClientName');
    const clientIdInput = document.getElementById('clientId');
    const accessForm = document.getElementById('accessForm');
    const codeInputs = document.querySelectorAll('.code-input input');
    const catalogLinks = document.querySelectorAll('.catalog-nav a');
    const catalogPlaceholder = document.getElementById('catalogPlaceholder');
    const catalogContent = document.getElementById('catalogContent');
    const backButton = document.getElementById('backButton');
    
    // Códigos de acceso para cada cliente (simulados)
    const clientCodes = {
        'spigolo': '9012',
        'litech': '3456',
        'peru-chicken': '7890',
        'avila': '2345',
        'migas-mall': '6789'
    };
    
    // Abrir modal al hacer clic en una tarjeta de cliente
    clientCards.forEach(card => {
        card.addEventListener('click', function() {
            const client = this.getAttribute('data-client');
            const logoSrc = this.querySelector('img').src;
            const clientName = this.querySelector('.client-name').textContent;
            
            modalClientLogo.src = logoSrc;
            modalClientName.textContent = `Acceso a ${clientName}`;
            clientIdInput.value = client;
            modal.style.display = 'flex';
            
            // Limpiar inputs
            codeInputs.forEach(input => input.value = '');
            codeInputs[0].focus();
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Manejar entrada del código
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });
    
    // Manejar envío del formulario
    accessForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const clientId = clientIdInput.value;
        const enteredCode = Array.from(codeInputs).map(input => input.value).join('');
        
        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clientId, code: enteredCode })
            });
            
            const result = await response.json();
            
            if (result.success) {
                window.location.href = result.redirectUrl;
            } else {
                alert('Código incorrecto. Por favor, intente nuevamente.');
                codeInputs.forEach(input => input.value = '');
                codeInputs[0].focus();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión. Por favor, intente más tarde.');
        }
    });
    
    // Navegación de catálogos
    catalogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            catalogLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            const catalogType = this.getAttribute('data-catalog');
            loadCatalog(catalogType);
        });
    });
    
    // Botón de volver
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        showCatalogMenu();
    });
    
    function loadCatalog(type) {
        // Ocultar placeholder y mostrar contenido
        catalogPlaceholder.style.display = 'none';
        catalogContent.style.display = 'block';
        backButton.style.display = 'inline-flex';
        
        // Simular carga de contenido según el tipo de catálogo
        let catalogHTML = '';
        
        switch(type) {
            case 'insumos':
                catalogHTML = `
                    <h2><i class="fas fa-box"></i> Catálogo de Insumos</h2>
                    <p>Explora nuestra amplia gama de productos de limpieza, papelería, desechables y suministros industriales.</p>
                    <div style="margin-top: 2rem; text-align: center;">
                        <a href="/catalogos/insumos.html" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> Ver Catálogo Completo
                        </a>
                    </div>
                `;
                break;
            case 'packaging':
                catalogHTML = `
                    <h2><i class="fas fa-gift"></i> Catálogo de Packaging</h2>
                    <p>Descubre nuestras soluciones de empaque y embalaje para todo tipo de industrias y necesidades.</p>
                    <div style="margin-top: 2rem; text-align: center;">
                        <a href="/catalogos/packaging.html" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> Ver Catálogo Completo
                        </a>
                    </div>
                `;
                break;
            case 'tecnologia':
                catalogHTML = `
                    <h2><i class="fas fa-microchip"></i> Soluciones Tecnológicas</h2>
                    <p>Conoce nuestras opciones en hardware, software y soluciones IT para optimizar tu empresa.</p>
                    <div style="margin: 2rem 0; padding: 1.5rem; background: var(--chip); border-radius: var(--radius);">
                        <p>Próximamente: Estamos preparando nuestro catálogo de tecnología.</p>
                    </div>
                `;
                break;
            case 'logistica':
                catalogHTML = `
                    <h2><i class="fas fa-shipping-fast"></i> Soluciones Logísticas</h2>
                    <p>Descubre nuestros servicios especializados en cadena de suministro y distribución.</p>
                    <div style="margin: 2rem 0; padding: 1.5rem; background: var(--chip); border-radius: var(--radius);">
                        <p>Próximamente: Estamos preparando nuestro catálogo de soluciones logísticas.</p>
                    </div>
                `;
                break;
        }
        
        catalogContent.innerHTML = catalogHTML;
        
        // Scroll suave a la sección de catálogos
        document.getElementById('catalogos').scrollIntoView({ behavior: 'smooth' });
    }
    
    function showCatalogMenu() {
        // Mostrar placeholder y ocultar contenido
        catalogPlaceholder.style.display = 'flex';
        catalogContent.style.display = 'none';
        backButton.style.display = 'none';
        
        // Remover clase active de todos los enlaces
        catalogLinks.forEach(l => l.classList.remove('active'));
    }
    
    // Efecto de escritura en el hero
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
});
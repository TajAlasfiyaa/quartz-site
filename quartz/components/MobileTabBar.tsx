import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const MobileTabBar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "mobile-tab-bar")}>
      <button class="tab-button" id="mobile-menu-trigger" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        <span>القائمة</span>
      </button>

      <a href="/" class="tab-button" aria-label="Home">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        <span>الرئيسية</span>
      </a>

      <button class="tab-button" id="mobile-search-trigger" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <span>بحث</span>
      </button>

      <button class="tab-button" id="mobile-toc-trigger" aria-label="TOC">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-collapse"><path d="m3 10 2.5-2.5L3 5" /><path d="m3 19 2.5-2.5L3 14" /><path d="M10 6h11" /><path d="M10 12h11" /><path d="M10 18h11" /></svg>
        <span>المحتويات</span>
      </button>
    </div>
  )
}

MobileTabBar.css = `
.mobile-tab-bar {
  display: none;
  @media all and (max-width: 600px) { // Standard mobile breakpoint
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.85); /* Glassmorphism base */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(0,0,0,0.05);
    z-index: 10000;
    justify-content: space-around;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.tab-button {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--darkgray);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  padding: 5px;
  flex: 1;
  text-decoration: none; // for anchor
}

.tab-button svg {
  width: 22px;
  height: 22px;
  stroke: var(--darkgray);
}

.tab-button:active, .tab-button:hover {
  color: var(--secondary);
}

.tab-button:active svg, .tab-button:hover svg {
  stroke: var(--secondary);
}

/* Dark mode adjustments */
:global([saved-theme="dark"]) .mobile-tab-bar {
  background: rgba(20, 20, 20, 0.85);
  border-top: 1px solid rgba(255,255,255,0.1);
}
`

MobileTabBar.afterDOMLoaded = `
const menuTrigger = document.getElementById("mobile-menu-trigger")
if (menuTrigger) {
  menuTrigger.addEventListener("click", () => {
    // Current mobile explorer trigger
    const explorer = document.querySelector(".explorer .mobile-explorer") as HTMLElement
    // Or simpler: find the folder icon if it exists, or just toggle the collapsed state manually?
    // Quartz usually binds .mobile-explorer (the icon) to toggle .explorer.collapsed
    // Let's try simulating click on the existing hamburger if present, or toggling class.
    
    // Actually, let's find the sidebar and toggle it.
    // The standard quartz logic is in explorer.inline.ts which binds to .explorer-toggle
    // Let's assume we can piggyback or replicate.
    
    const explorerDiv = document.querySelector(".explorer")
    if (explorerDiv) {
        // We can just find the existing toggle button inside it and click it
        const toggleBtn = explorerDiv.querySelector(".explorer-toggle") as HTMLElement
        if (toggleBtn) toggleBtn.click()
    }
  })
}

const searchTrigger = document.getElementById("mobile-search-trigger")
if (searchTrigger) {
  searchTrigger.addEventListener("click", () => {
    const searchBar = document.querySelector(".search-button") as HTMLElement
    if (searchBar) searchBar.click() // Quartz search opens on click of .search-button (the bar itself)
    // Or if it's the shortcut key listener...
    // Let's dispatch a 'keydown' for Command+K?
    // Or better, just find the input and focus or click the container.
    // Standard Quartz uses a "p" tag or "div" as .search-button.
  })
}

const tocTrigger = document.getElementById("mobile-toc-trigger")
if (tocTrigger) {
  tocTrigger.addEventListener("click", () => {
    // Current mobile TOC trigger we added earlier
    const existingMobileToc = document.querySelector("button.mobile-toc") as HTMLElement
    if (existingMobileToc) existingMobileToc.click()
  })
}
`

export default (() => MobileTabBar) satisfies QuartzComponentConstructor

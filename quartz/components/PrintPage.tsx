import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PrintPage: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return (
        <button
            class={classNames(displayClass, "print-page")}
            onClick="window.print()"
            aria-label="Print Page"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-printer"
            >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect width="12" height="8" x="6" y="14"></rect>
            </svg>
        </button>
    )
}

PrintPage.css = `
.print-page {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--darkgray);
  padding: 0;
  margin: 0 0.5rem;
  transition: color 0.2s ease;
}

.print-page:hover {
  color: var(--secondary);
}
`

export default (() => PrintPage) satisfies QuartzComponentConstructor

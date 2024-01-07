const Footer = () => {
  return (
    <footer className="mt-auto flex w-full flex-col justify-between  bg-gray-200 px-[var(--gutter)] pb-3 pt-4 text-sm md:flex-row">
      {/* describe the project and technologies involved */}
      <p className="text-black">
        <span className="uppercase tracking-wide">Flickr Gallery</span> by{' '}
        <a
          className="underline hover:text-red-700"
          href="https://freeotoole.com"
          target="_blank"
        >
          Free O&apos;Toole
        </a>
      </p>
      <p className="text-gray-700">
        Built with{' '}
        <a
          className="underline hover:text-black"
          href="https://nextjs.org"
          target="_blank"
        >
          Next.js
        </a>
        ,{' '}
        <a
          className="underline hover:text-black"
          href="https://tailwindcss.com"
          target="_blank"
        >
          Tailwind CSS
        </a>
        , and the{' '}
        <a
          className="underline hover:text-black"
          href="https://www.flickr.com/services/api"
          target="_blank"
        >
          Flickr API
        </a>
        .
      </p>
    </footer>
  )
}

export default Footer

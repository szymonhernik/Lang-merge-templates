import { ContactPagePayload } from '@/types'
import { CustomPortableText } from './CustomPortableText'
import PageTitle from './PageTitle'

type ContactLayoutProps = {
  data: ContactPagePayload | null
  currentLanguage: string
}

export async function ContactLayout({
  data,
  currentLanguage,
}: ContactLayoutProps) {
  const { contactLink, colophon } = data ?? {}

  return (
    <section className="py-mobileSpace md:pt-mobileSpace lg:pb-16 max-w-screen-3xl mx-auto">
      <PageTitle currentLanguage={currentLanguage} currentPage={'Contact'} />

      <div className="pt-mobileSpace lg:pt-0 p-6 about w-full flex flex-col lg:flex-row gap-8 font-medium ">
        <div className="lg:w-1/2 space-y-16 ">
          <div className="max-w-screen-md  flex gap-4 flex-col">
            <h1 className="text-xl hidden lg:block">Contact</h1>
            {contactLink && contactLink.length > 0 && (
              <div className=" text-xl">
                {contactLink.map((link) => {
                  return (
                    <p key={link._key} className="lowercase">
                      {link.title}:{' '}
                      <a
                        target="_blank"
                        href={link.url}
                        className="underline md:no-underline	md:hover:underline"
                      >
                        {link.handle}
                      </a>
                    </p>
                  )
                })}
              </div>
            )}

            <article className="flex flex-col gap-8 font-normal ">
              <div className="mt-8 text-sm space-y-4">
                <h2 className="font-medium text-base mb-2">Colophon</h2>
                {colophon && <CustomPortableText value={colophon} />}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

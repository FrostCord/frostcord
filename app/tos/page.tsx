import Head from 'next/head';
import styles from '@/styles/PrivacyTos.module.css';

export default function Tos() {
  return (
    <>
      <Head>
        <title>FrostByte</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.mainBackground} bg-grey-600`}>
        <div
          className={`${styles.authMD} items-center overflow-auto h-screen w-full `}
        >
          <div
            className={`${styles.mainContainer} col-start-5 col-end-9 row-start-2 row-end-3 flex w-full h-full rounded-3xl`}
          >
            <div
              className={`flex flex-col w-full  items-center rounded-3xl ${styles.rightSide} overflow-auto z-50`}
            >
              <div className="basis-[20%] flex items-center relative mt-7 text-4xl font-semibold">
                Terms of Service
              </div>
              <div className="self-start pl-7 text-lg font-medium mt-7">
                Effective Date: May 27th, 2023
              </div>
              <div className="p-7">
                Welcome to Frostbyte! These Terms of Service (&quot;Terms&quot;)
                govern your use of the Frostbyte application, services, and
                website (collectively referred to as the &quot;Service&quot;).
                By using Frostbyte, you agree to comply with and be bound by
                these Terms. If you do not agree to these Terms, you may not use
                the Service.
                <br></br>
                <br></br>
                1. Acceptance of Terms<br></br> 1.1 Agreement: By accessing or
                using the Service, you acknowledge that you have read,
                understood, and agree to be bound by these Terms, our Privacy
                Policy, and any other policies or guidelines posted on
                Frostbyte.<br></br> 1.2 Eligibility: You must be at least 13
                years old to use Frostbyte. If you are under the age of 13, you
                may only use Frostbyte with parental consent.<br></br> 1.3
                Modifications: Frostbyte reserves the right to modify or update
                these Terms at any time without prior notice. It is your
                responsibility to review the most current version of the Terms.
                Continued use of the Service after any modifications constitutes
                acceptance of the revised Terms.
                <br></br>
                <br></br>
                2. User Conduct<br></br> 2.1 Compliance: You agree to use
                Frostbyte in compliance with all applicable laws, regulations,
                and these Terms.<br></br> 2.2 Prohibited Activities: You must
                not use Frostbyte for any of the following prohibited
                activities: <br></br>a) Violating any laws or infringing upon
                the rights of others; <br></br>b) Distributing viruses, malware,
                or any other malicious content; <br></br>c) Impersonating any
                person or entity or providing false information; <br></br>d)
                Engaging in harassment, hate speech, or any other abusive
                behavior; <br></br>e) Collecting or storing personal information
                of others without consent; <br></br>f) Interfering with or
                disrupting the Service or its servers; <br></br>g) Violating any
                intellectual property rights or proprietary rights of Frostbyte
                or third parties.
                <br></br>
                <br></br>
                3. User Content <br></br>3.1 Ownership: You retain ownership of
                any content you submit, upload, or display on Frostbyte
                (&quot;User Content&quot;). However, by submitting User Content,
                you grant Frostbyte a non-exclusive, worldwide, royalty-free
                license to use, modify, adapt, publish, and distribute such User
                Content for the purposes of operating and improving the Service.{' '}
                <br></br>3.2 Responsibility: You are solely responsible for your
                User Content and the consequences of sharing it. Frostbyte does
                not endorse or guarantee the accuracy, quality, or integrity of
                any User Content. <br></br>3.3 Prohibited Content: You must not
                submit any User Content that is illegal, defamatory, offensive,
                or violates the rights of others. Frostbyte reserves the right
                to remove or disable any User Content that violates these Terms.
                <br></br>
                <br></br>
                4. Intellectual Property <br></br>4.1 Frostbyte&apos;s Property:
                All intellectual property rights in Frostbyte, including but not
                limited to trademarks, logos, graphics, and software, are the
                property of Frostbyte or its licensors. You may not use
                Frostbyte&apos;s intellectual property without prior written
                consent. <br></br>4.2 User License: Frostbyte grants you a
                limited, revocable, non-transferable, and non-exclusive license
                to use the Service for personal, non-commercial purposes. This
                license does not grant you any rights to use Frostbyte&apos;s
                intellectual property.
                <br></br>
                <br></br>
                5. Termination <br></br>5.1 Termination by User: You may
                terminate your account and stop using Frostbyte at any time.{' '}
                <br></br>5.2 Termination by Frostbyte: Frostbyte may terminate
                or suspend your access to the Service, in whole or in part,
                without prior notice if it believes you have violated these
                Terms or any applicable laws. <br></br>5.3 Effect of
                Termination: Upon termination, your right to use Frostbyte will
                cease immediately. All provisions of these Terms that should
                reasonably survive termination will continue to apply.
                <br></br>
                <br></br>
                6. Limitation of Liability <br></br>6.1 Disclaimer: Frostbyte
                provides the Service on an &quot;as is&quot; and &quot;as
                available&quot; basis without any warranties or guarantees of
                any kind. Your use of the Service is at your sole risk.{' '}
                <br></br>6.2 Indemnification: You agree to indemnify, defend,
                and hold Frostbyte harmless from any claims, losses, damages,
                liabilities, and expenses arising out of your use of the Service
                or any violation of these Terms. <br></br>6.3 Limitation of
                Liability: In no event shall Frostbyte be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, whether arising from your use of the Service or any
                breach of these Terms.
                <br></br>
                <br></br>
                7. Governing Law<br></br> These Terms shall be governed by and
                construed in accordance with the laws of Ontario, Canada.. Any
                disputes arising from or relating to these Terms or your use of
                Frostbyte shall be subject to the exclusive jurisdiction of the
                courts of Ontario, Canada.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
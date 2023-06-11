import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Page from '../components/Page';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/home');
    }, 2000); // Redirect after 2 seconds
  }, []);

  return (
    <Page>
    <div className="m-8">
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to the home page...</p>
    </div>
    </Page>
  );
};

export default NotFoundPage;

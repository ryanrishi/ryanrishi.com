import Head from 'next/head'
import Link from 'next/Link';

export default function Home() {
  return (
    <div className='md:flex bg-white rounded-lg p-24 justify-center'>
      <img
        className='h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'
        src='https://ryanrishi.com/img/face.png'
      />
      <div className='text-center md:text-left'>
        <h2 className='text-lg'>Ryan Rishi</h2>
        <div className='text-purple-500'>Full-stack developer</div>
        <div className='text-gray-600'>Twitter:&nbsp;
          <Link href='https://twitter.com/ryanrishi'>@ryanrishi</Link>
        </div>
        <Link href='https://ryanrishi.com' className='text-gray-600'>ryanrishi.com</Link>
      </div>
    </div>
  );
}


import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions' 
import { redirect } from 'next/navigation'

const Home = async () => {
  
  const { userId } = await auth();

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);

  return (

    <div>
      <div>
        <TransformationForm 
          userId={user._id}
          creditBalance={user.creditBalance}
        />
        
      </div>
    </div>
  )
}

export default Home

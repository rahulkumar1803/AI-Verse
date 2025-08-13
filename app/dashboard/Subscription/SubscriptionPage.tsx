import React from 'react'
import { useAppContext } from '@/app/AppContext'
import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';

interface PlanProps {
  title: string;
  price: string;
  features: string[];
  buttonLabel: string;
  isPro: boolean;
}

function PlanCard({ title, price, features, buttonLabel, isPro }: PlanProps) {
  const {
    isDarkModeObject: { isDarkMode },
  } = useAppContext();

  return (
    <div
      className={`rounded-lg shadow-lg ${isDarkMode ? "bg-slate-800" : "border-slate-100 border bg-white"
        } flex px-10 flex-col gap-3 relative mt-6 pt-6 pb-10 w-[351px]`}
    >
      {/* Plan and Price */}
      <div className='mt-5'>
        <h3 className='text-sl text-center'>{title}</h3>
        <div className='text-[32px] font-semibold text-center mb-8'>
          {price}
        </div>
      </div>

      {/* features */}
      <ul className={`mb-6 flex gap-3 flex-col`}>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center gap-2 text-sm'>
            <IoCheckmarkCircle className='text-purple-600' />
            <span
              className={`${isDarkMode ? "text-slate-300" : "text-slate-700"}`} >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      {isPro && (
        <button
          className={`w-full py-2 px-4 rounded text-white ${isPro ? "bg-purple-600" : "bg-gray-500"
            } hover:opacity-90 transition duration-300`}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

function SubscriptionPlans() {
  const {
    isDarkModeObject: { isDarkMode },
    mainMenuItemsObject: { setMainMenuItems },
  } = useAppContext();
  return (
    <div
      className={`flex flex-col gap-6 items-center max-md:px-24 px-48 py-16 max-md:py-11 p-8 relative w-full ${isDarkMode ? "bg-slate-700 text-white" : "bg-slate-50"
        }}`}
    >
      <IoClose
        onClick={() => {
          setMainMenuItems((prevItems) =>
            prevItems.map((item) =>
              item.label === "DashBoard"
                ? { ...item, isSelected: true }
                : { ...item, isSelected: false }
            )
          );
        }}
        className='absolute right-9 top-9 text-[24px] text-slate-600 cursor-pointer'
      />
      <div className='flex flex-col items-center gap-7'>
        <h3 className='text-3xl font-bold'>Upgrade Your Plan</h3>
        <p
          className={`text-[13px] mt-1 leading-[22px] text-center px-32 max-md:px-0 ${isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
        >
          Unlock the power of AI. Subscribe now for smarter tools, faster insights, and creative breakthroughs. Join thousands transforming productivity, learning, and innovation—start your AI journey today!
        </p>
      </div>

      <div className='flex gap-4 max-md:flex-col flex-row'>
        <PlanCard
          title='Pro Plan'
          price='$9,99'
          features={[
            "Ultimated Access to All Templates",
            "Generate up to 100,000 words per month.",
            "Priority Customer Support",
            "Customer Content Tone",
            "Better Options",
          ]}
          buttonLabel='Get Started'
          isPro={true}
        />
      </div>
    </div>
  )
}

export default SubscriptionPlans;
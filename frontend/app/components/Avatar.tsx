import { SanityImage } from '@/app/components/SanityImage'
import { DateComponent } from '@/app/components/Date'

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: {
      asset?: { _ref: string }
      hotspot?: { x?: number; y?: number }
      crop?: { top?: number; bottom?: number; left?: number; right?: number }
      alt?: string
    } | null
  }
  date?: string
  small?: boolean
}

export const Avatar = ({ person, date, small = false }: Props) => {
  const { firstName, lastName, picture } = person

  return (
    <div className="flex items-center font-mono">
      {picture?.asset?._ref ? (
        <div className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}>
          <SanityImage
            id={picture.asset._ref}
            alt={picture?.alt || ''}
            className="h-full rounded-full"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            hotspot={
              picture.hotspot?.x != null && picture.hotspot?.y != null
                ? { x: picture.hotspot.x, y: picture.hotspot.y }
                : undefined
            }
            crop={
              picture.crop
                ? {
                    top: picture.crop.top ?? 0,
                    bottom: picture.crop.bottom ?? 0,
                    left: picture.crop.left ?? 0,
                    right: picture.crop.right ?? 0,
                  }
                : undefined
            }
            mode="cover"
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className={`${small ? 'text-sm' : ''}`}>
            {firstName} {lastName}
          </div>
        )}
        <div className={`text-gray-600 ${small ? 'text-xs' : 'text-sm'}`}>
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  )
}

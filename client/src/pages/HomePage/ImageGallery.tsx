import React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

const itemData = [
  {
    img: '/img-1091.webp',
    rows: 4,
    cols: 2,
  },

  {
    img: '/img-1090.webp',
    rows: 8,
    cols: 2,
  },
  {
    img: '/img-1094.webp',
    title: 'Breakfast',
    rows: 4,
    cols: 1,
  },
  {
    img: '/img-1096.webp',
    rows: 2,
    cols: 1,
  },
  {
    img: '/img-1093.webp',
    rows: 2,
    cols: 1,
  },
]

/**
 * @component
 * @desc Renders image gallery component
 */
const ImageGallery = () => {
  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    }
  }

  return (
    <ImageList
      sx={{ width: '100%', height: 'auto', borderRadius: '5px' }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
            style={{ borderRadius: '5px' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default ImageGallery

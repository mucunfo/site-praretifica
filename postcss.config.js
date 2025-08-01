import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  plugins: [
    autoprefixer({
      // Configurações do autoprefixer
      flexbox: 'no-2009',
      grid: 'autoplace'
    }),
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: false,
          removeAllButFirst: true
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true
      }]
    })
  ]
} 
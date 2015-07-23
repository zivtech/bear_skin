group :development do
  guard 'livereload' do
    watch(%r{css/styles.css})
    watch(%r{images/*.(png|jpg|gif)$})
  end

  guard :compass, configuration_file: 'config.rb',
        compile_on_start: true do
    watch(%r{..\/sass\/styles.scss$})
    watch(%r{..\/sass\/print.scss$})
  end
end
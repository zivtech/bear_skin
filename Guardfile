group :development do
  guard 'livereload' do
    watch(%r{.+\.(css|png|jpg|gif?)$})
  end

  guard :compass, configuration_file: 'config.rb',
        compile_on_start: true do
    watch(%r{..\/sass\/.*\.scss$})
  end
end
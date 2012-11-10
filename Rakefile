require 'rake'

task :default => [:sass]
  
task :sass do
  sh 'sass --update public/scss:public/css'
end

task :watch do
	sh 'sass --watch public/scss:public/css'
end

task :clean do
	sh 'rm -rf public/css/*'
end


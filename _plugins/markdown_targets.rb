# _plugins/markdown_targets.rb
require 'nokogiri'

module Jekyll
  module TargetBlankFilter
    def target_blank(input)
      doc = Nokogiri::HTML(input)
      links = doc.css('a')
      links.each do |link|
        link['target'] = '_blank' unless link['href'].start_with?('#', '/', 'mailto:')
      end
      doc.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::TargetBlankFilter)

# frozen_string_literal: true

RSpec.shared_examples 'a supported metrics dashboard url' do
  context 'no user is logged in' do
    it 'redacts the placeholder' do
      expect(doc.to_s).to be_empty
    end
  end

  context 'the user does not have permission do see charts' do
    let(:doc) { filter(input, current_user: build(:user)) }

    it 'redacts the placeholder' do
      expect(doc.to_s).to be_empty
    end
  end

  context 'the user has requisite permissions' do
    let(:user) { create(:user) }
    let(:doc) { filter(input, current_user: user) }

    it 'leaves the placeholder' do
      project.add_maintainer(user)

      expect(doc.to_s).to eq(input)
    end
  end
end

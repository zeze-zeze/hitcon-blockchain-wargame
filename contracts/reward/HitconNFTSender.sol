pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Hitcon HitconNFTSender ERC1155 proof
/// @notice This contract issue prood of solve as an NFT
contract HitconNFTSender is ERC1155Supply, Ownable, ReentrancyGuard {
    /// @notice Noted that the uri should follow: http(ipfs)://.../{id}.json
    ///         without the '/{id}.json part'. Eg: uri = https://hitcoin
    /// @dev    Be careful when setting the _uri. Remember to follow the rule
    ///         https://eips.ethereum.org/EIPS/eip-1155#metadata
    constructor(string memory _uri) ERC1155(_uri) {}

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(exists(_tokenId), "tokenId does not exist");

        return
            string(
                abi.encodePacked(
                    super.uri(_tokenId),
                    "/",
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    /// @notice This function should only be called by owner. Also,
    ///         logic of preventing double minting was implemented in server
    ///         to reduce gas fee.
    /// @dev    Prevent double minting and reentery attack. Make sure owner
    ///         address is correct, authorizing user token, and preventing 
    ///         double minting logic is correct.
    function allSolved(address _solver)
        external
        nonReentrant
        onlyOwner
    {
        _mint(_solver, 1, 1, "");
    }

    /// @notice Set the new URI for the ERC1155.
    /// @dev    Be careful of the uri issue.
    function setURI(string memory _newuri) public onlyOwner {
        super._setURI(_newuri);
    }
}
